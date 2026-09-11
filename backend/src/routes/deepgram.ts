import { Router, type Response } from 'express';
import { body } from 'express-validator';
import { prisma } from '../lib/prisma';
import { requireAuth, type AuthRequest } from '../middleware/auth';
import { handleValidation } from '../middleware/validate';

const router = Router();

let cachedProjectId: string | null = null;

// ─── POST /api/deepgram/token ──────────────────────────────────────────────────
// Returns a scoped Deepgram credential for the active call session.
// If DEEPGRAM_API_KEY is not set in environment, returns isConfigured: false
// so the frontend client can gracefully fall back without erroring.
router.post(
  '/token',
  requireAuth,
  [body('sessionId').notEmpty().withMessage('Session ID is required')],
  handleValidation,
  async (req: AuthRequest, res: Response) => {
    const { sessionId } = req.body as { sessionId: string };
    const userId = req.user!.userId;
    const practitionerId = req.user!.practitionerId;

    try {
      // 1. Verify caller belongs to this session
      const session = await prisma.session.findFirst({
        where: {
          id: sessionId,
          OR: [
            { userId },
            ...(practitionerId ? [{ practitionerId }] : [{ practitionerId: userId }]),
          ],
        },
        select: { id: true, type: true, status: true },
      });

      if (!session) {
        res.status(404).json({ success: false, message: 'Session not found or unauthorized' });
        return;
      }

      if (session.type === 'CHAT') {
        res.status(400).json({ success: false, message: 'Transcripts are only for audio/video sessions' });
        return;
      }

      const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
      let deepgramProjectId = process.env.DEEPGRAM_PROJECT_ID || cachedProjectId;

      if (!deepgramApiKey) {
        console.warn(`[Deepgram] DEEPGRAM_API_KEY is not configured in backend environment for session ${sessionId}`);
        res.json({
          success: true,
          data: {
            isConfigured: false,
            message: 'DEEPGRAM_API_KEY not configured in backend environment',
          },
        });
        return;
      }

      // If DEEPGRAM_PROJECT_ID is not set in env, auto-discover it via Deepgram projects API
      if (!deepgramProjectId) {
        try {
          console.log('[Deepgram] DEEPGRAM_PROJECT_ID not set. Auto-discovering project ID via Deepgram API...');
          const projRes = await fetch('https://api.deepgram.com/v1/projects', {
            headers: { Authorization: `Token ${deepgramApiKey}` },
          });

          if (projRes.ok) {
            const projData = (await projRes.json()) as { projects?: Array<{ project_id: string; name: string }> };
            const firstProject = projData.projects && projData.projects.length > 0 ? projData.projects[0] : null;
            if (firstProject) {
              deepgramProjectId = firstProject.project_id;
              cachedProjectId = deepgramProjectId;
              console.log(`[Deepgram] Successfully discovered project ID: ${deepgramProjectId} (${firstProject.name})`);
            } else {
              console.warn('[Deepgram] No projects returned by Deepgram API for this API key.');
            }
          } else {
            const errText = await projRes.text();
            console.warn(`[Deepgram] Project discovery failed (HTTP ${projRes.status}): ${errText}`);
          }
        } catch (projErr) {
          console.warn('[Deepgram] Project discovery network error:', projErr);
        }
      }

      // Attempt to create a short-lived ephemeral key (TTL: 1 hour), scoped to this session
      if (deepgramProjectId) {
        try {
          const keyRes = await fetch(
            `https://api.deepgram.com/v1/projects/${deepgramProjectId}/keys`,
            {
              method: 'POST',
              headers: {
                Authorization: `Token ${deepgramApiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                comment: `Session-${sessionId}-${Date.now()}`,
                time_to_live_in_seconds: 3600,
                scopes: ['usage:write'],
              }),
            }
          );

          if (keyRes.ok) {
            const keyData = (await keyRes.json()) as { key: string };
            console.log(`[Deepgram] Issued ephemeral key for session ${sessionId}`);
            res.json({
              success: true,
              data: {
                apiKey: keyData.key,
                isConfigured: true,
                isEphemeral: true,
              },
            });
            return;
          } else {
            const errBody = await keyRes.text();
            console.warn(`[Deepgram] Ephemeral key creation failed (HTTP ${keyRes.status}): ${errBody}`);
          }
        } catch (keyErr) {
          console.warn('[Deepgram] Ephemeral key creation request error:', keyErr);
        }
      }

      // Fallback: If ephemeral key creation is not supported by the account key (e.g. key lacks 'keys:write' scope),
      // serve the direct API key so transcription succeeds rather than failing completely.
      console.warn(
        `[Deepgram] Serving direct API key fallback for session ${sessionId}. ` +
        `Note: To use ephemeral keys, configure a key with Admin role ('keys:write' scope) in Deepgram console.`
      );

      res.json({
        success: true,
        data: {
          apiKey: deepgramApiKey,
          isConfigured: true,
          isEphemeral: false,
        },
      });
    } catch (err) {
      console.error('[Deepgram] Error generating STT token:', err);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
);

export default router;

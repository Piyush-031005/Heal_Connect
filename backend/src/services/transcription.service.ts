import { AssemblyAI } from 'assemblyai';
import { DeepgramClient } from '@deepgram/sdk';
import { prisma } from '../lib/prisma';
import { flagContentIfNeeded } from '../lib/moderation';

const assemblyClient = process.env.ASSEMBLYAI_API_KEY
  ? new AssemblyAI({ apiKey: process.env.ASSEMBLYAI_API_KEY })
  : null;

const deepgram = process.env.DEEPGRAM_API_KEY
  ? new DeepgramClient({ apiKey: process.env.DEEPGRAM_API_KEY })
  : null;

/**
 * Saves a completed transcript to the database and runs moderation
 */
export async function autoTranscribeSession(
  sessionId: string,
  transcriptText: string,
  userId: string,
  practitionerId: string
) {
  try {
    console.log(`[Transcription DB] Saving transcript for session ${sessionId} (length=${transcriptText?.length || 0})`);
    const transcript = await prisma.callTranscript.upsert({
      where: { sessionId },
      update: {
        transcriptText,
        submittedAt: new Date(),
      },
      create: {
        sessionId,
        transcriptText,
        userId,
        practitionerId,
      },
    });

    // Run moderation scan async
    flagContentIfNeeded(transcriptText, 'CALL_TRANSCRIPT', {
      sessionId,
      userId,
      practitionerId,
      transcriptId: transcript.id,
    }).catch((err) => console.error('[Transcription Moderation] Scan error:', err));

    console.log(`[Transcription DB] Successfully saved transcript ${transcript.id} for session ${sessionId}`);
    return transcript;
  } catch (err: any) {
    console.error(`[Transcription DB] Error saving transcript for session ${sessionId}:`, err);
    throw err;
  }
}

/**
 * Transcribes a call from an audio/recording URL using AssemblyAI (universal speech models, speaker labels, PII redaction)
 * with Deepgram fallback.
 */
export async function transcribeCall(
  audioUrl: string,
  sessionId: string,
  userId?: string,
  practitionerId?: string
) {
  console.log(`[Transcription Step 1/4] Starting transcribeCall for session ${sessionId}...`);
  console.log(`[Transcription Step 1/4] Audio URL: ${audioUrl}`);

  // 1. Resolve session participants if not provided
  let sessionUserId = userId;
  let sessionPractitionerId = practitionerId;

  if (!sessionUserId || !sessionPractitionerId) {
    const session = await prisma.session.findUnique({
      where: { id: sessionId },
      select: { userId: true, practitionerId: true },
    });
    if (session) {
      sessionUserId = sessionUserId || session.userId;
      sessionPractitionerId = sessionPractitionerId || session.practitionerId;
    }
  }

  if (!sessionUserId || !sessionPractitionerId) {
    console.error(`[Transcription] Could not resolve user and practitioner for session ${sessionId}`);
    return null;
  }

  // 2. Primary: AssemblyAI
  if (assemblyClient) {
    try {
      console.log(`[Transcription Step 2/4] Transcribing via AssemblyAI with speaker labels and PII redaction...`);
      const transcript = await assemblyClient.transcripts.transcribe({
        audio: audioUrl,
        speaker_labels: true,
        redact_pii: true,
        redact_pii_policies: ['phone_number', 'email_address'],
        redact_pii_sub: 'entity_name',
      });

      if (transcript.status === 'error') {
        console.error(`[Transcription Step 2/4] AssemblyAI failed:`, transcript.error);
        return null;
      }

      console.log(`[Transcription Step 2/4] AssemblyAI completed. Utterances: ${transcript.utterances?.length || 0}`);

      // Format speaker labels (separates user vs expert)
      let formattedText = '';
      if (transcript.utterances && transcript.utterances.length > 0) {
        formattedText = transcript.utterances
          .map((u: any) => `Speaker ${u.speaker}: ${u.text}`)
          .join('\n\n');
      } else {
        formattedText = transcript.text || '';
      }

      if (!formattedText.trim()) {
        console.log(`[Transcription] Audio was empty or silent for session ${sessionId}`);
        return null;
      }

      // 3. Save to DB
      console.log(`[Transcription Step 3/4] Saving transcript to DB for session ${sessionId}...`);
      const savedTranscript = await autoTranscribeSession(
        sessionId,
        formattedText,
        sessionUserId,
        sessionPractitionerId
      );

      // 4. Check if any PII redactions occurred and flag for moderation
      console.log(`[Transcription Step 4/4] Checking PII redactions for session ${sessionId}...`);
      const hadPiiRedactions =
        formattedText.includes('[PHONE_NUMBER]') ||
        formattedText.includes('[EMAIL_ADDRESS]') ||
        Boolean(transcript.text?.includes('[PHONE_NUMBER]') || transcript.text?.includes('[EMAIL_ADDRESS]'));

      if (hadPiiRedactions && savedTranscript) {
        console.warn(`[Transcription Moderation] PII detected in call transcript for session ${sessionId}. Flagging for moderation review.`);
        await flagContentIfNeeded(
          formattedText,
          'CALL_TRANSCRIPT',
          {
            sessionId,
            userId: sessionUserId,
            practitionerId: sessionPractitionerId,
            transcriptId: savedTranscript.id,
          }
        ).catch((err) => console.error('[Transcription Moderation] Error flagging PII:', err));
      }

      return savedTranscript;
    } catch (err) {
      console.error(`[Transcription] AssemblyAI error for session ${sessionId}:`, err);
    }
  }

  // 3. Fallback: Deepgram
  if (deepgram) {
    try {
      console.log(`[Transcription] Falling back to Deepgram for session ${sessionId}...`);
      const response = await deepgram.listen.v1.media.transcribeUrl({
        url: audioUrl,
        model: 'nova-2',
        smart_format: true,
        diarize: true,
        detect_language: true,
      });

      const result = response as any;
      let formattedText = '';
      const paragraphs = result?.results?.channels[0]?.alternatives[0]?.paragraphs?.paragraphs;

      if (paragraphs && paragraphs.length > 0) {
        formattedText = paragraphs
          .map((p: any) => `Speaker ${p.speaker}: ${p.sentences.map((s: any) => s.text).join(' ')}`)
          .join('\n\n');
      } else {
        formattedText = result?.results?.channels[0]?.alternatives[0]?.transcript || '';
      }

      if (formattedText.trim()) {
        return await autoTranscribeSession(
          sessionId,
          formattedText,
          sessionUserId,
          sessionPractitionerId
        );
      }
    } catch (err) {
      console.error(`[Transcription] Deepgram fallback error for session ${sessionId}:`, err);
    }
  }

  console.error(`[Transcription] No transcription service available or all attempts failed for session ${sessionId}.`);
  return null;
}

/**
 * Backward compatibility alias for transcribeCall
 */
export async function transcribeFromRecordingUrl(
  sessionId: string,
  recordingUrl: string,
  userId?: string,
  practitionerId?: string
) {
  return transcribeCall(recordingUrl, sessionId, userId, practitionerId);
}

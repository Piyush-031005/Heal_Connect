// @ts-ignore
import { createClient } from '@deepgram/sdk';
import { prisma } from '../lib/prisma';
import { flagContentIfNeeded } from '../lib/moderation';

const deepgram = process.env.DEEPGRAM_API_KEY
  ? createClient(process.env.DEEPGRAM_API_KEY)
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
    const transcript = await prisma.callTranscript.create({
      data: {
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
    }).catch((err) => console.error('[moderation] transcript scan error:', err));

    return transcript;
  } catch (err: any) {
    if (err.code === 'P2002') {
      console.log(`[Transcription] Transcript already exists for session ${sessionId}`);
      return null;
    }
    throw err;
  }
}

/**
 * Fetches pre-recorded audio from URL and transcribes it via Deepgram
 */
export async function transcribeFromRecordingUrl(
  sessionId: string,
  recordingUrl: string,
  userId: string,
  practitionerId: string
) {
  if (!deepgram) {
    console.error('[Transcription] DEEPGRAM_API_KEY is missing. Skipping auto-transcription.');
    return;
  }

  try {
    console.log(`[Transcription] Starting pre-recorded transcription for session ${sessionId}...`);
    
    const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
      { url: recordingUrl },
      { 
        model: 'nova-2', 
        smart_format: true, 
        diarize: true, 
        detect_language: true 
      }
    );

    if (error) {
      console.error('[Transcription] Deepgram API error:', error);
      return;
    }

    // Format the diarized transcript
    // We combine paragraphs and include speaker labels
    let formattedText = '';
    const paragraphs = result?.results?.channels[0]?.alternatives[0]?.paragraphs?.paragraphs;
    
    if (paragraphs && paragraphs.length > 0) {
      formattedText = paragraphs
        .map((p: any) => `Speaker ${p.speaker}: ${p.sentences.map((s: any) => s.text).join(' ')}`)
        .join('\n\n');
    } else {
      // Fallback if diarization/paragraphs didn't yield expected structure
      formattedText = result?.results?.channels[0]?.alternatives[0]?.transcript || '';
    }

    if (!formattedText.trim()) {
      console.log(`[Transcription] Audio was empty or silent for session ${sessionId}.`);
      return;
    }

    await autoTranscribeSession(sessionId, formattedText, userId, practitionerId);
    console.log(`[Transcription] Successfully transcribed and saved session ${sessionId}.`);

  } catch (err) {
    console.error(`[Transcription] Fatal error transcribing session ${sessionId}:`, err);
  }
}

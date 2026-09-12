// test-transcribe.js — Standalone AssemblyAI test script
require('dotenv').config();
const { AssemblyAI } = require('assemblyai');

const apiKey = process.env.ASSEMBLYAI_API_KEY;
if (!apiKey) {
  console.error('ERROR: ASSEMBLYAI_API_KEY is not defined in environment variables.');
  process.exit(1);
}

const client = new AssemblyAI({ apiKey });

(async () => {
  try {
    console.log('Testing AssemblyAI transcription with audio: https://assembly.ai/wildfires.mp3 ...');
    const transcript = await client.transcripts.transcribe({
      audio: 'https://assembly.ai/wildfires.mp3', // public test file
      speaker_labels: true,
      redact_pii: true,
      redact_pii_policies: ['phone_number', 'email_address'],
      redact_pii_sub: 'entity_name',
    });

    if (transcript.status === 'error') {
      console.error('Transcription failed:', transcript.error);
      process.exit(1);
    }

    console.log('\n--- Transcription Successful ---');
    console.log('Status:', transcript.status);
    console.log('Utterances:', transcript.utterances?.length || 0);
    console.log('\nTranscript Preview:\n', transcript.text?.slice(0, 300) + '...\n');
  } catch (err) {
    console.error('Execution error:', err);
    process.exit(1);
  }
})();

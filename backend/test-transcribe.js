require("dotenv").config();
const { createClient } = require("@deepgram/sdk");

const deepgram = createClient(process.env.DEEPGRAM_API_KEY);

async function testTranscribe() {
  // Use any public sample audio URL to test, e.g. Deepgram's own demo file
  const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
    { url: "https://static.deepgram.com/examples/Bueller-Life-moves-pretty-fast.wav" },
    { model: "nova-2", smart_format: true }
  );

  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log(JSON.stringify(result.results.channels[0].alternatives[0].transcript, null, 2));
}

testTranscribe();

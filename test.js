const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GCP_API_KEY
});

async function run() {
  try {
    const res = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say Hello",
    });

    console.log(res.text);
  } catch (e) {
    console.log(e);
  }
}

run();
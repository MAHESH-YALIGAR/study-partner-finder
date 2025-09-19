const axios = require("axios");
require("dotenv").config();

async function runGemini() {
  try {
    const res = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [{ text: "Explain how AI works in a few words" }],
          },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Gemini reply:", res.data.candidates[0].content.parts[0].text);
  } catch (err) {
    console.error("🚨 Gemini API Error:", err.response?.data || err.message);
  }
}

runGemini();

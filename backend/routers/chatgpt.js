



const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: message }] }],
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (error) {
    console.error("🚨 Gemini API Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong with Gemini API" });
  }
});

module.exports = router;

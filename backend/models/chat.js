const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  from: { type: String, required: true },
  fromName: { type: String, required: true },
  to: { type: String, required: true },
  text: { type: String, default: "" },
  file: { type: String, default: null }, // store file path
  time: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Chat", ChatSchema);

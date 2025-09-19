const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

// Get private chat history between two users
router.get("/private/:user1/:user2", async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Chat.find({
      $or: [
        { from: user1, to: user2 },
        { from: user2, to: user1 },
      ],
    }).sort({ time: 1 }); // sort oldest → newest
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get group chat history
router.get("/group/:groupId", async (req, res) => {
  const { groupId } = req.params;
  try {
    const messages = await Chat.find({ to: groupId }).sort({ time: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

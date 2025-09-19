const express = require("express");
const router = express.Router();
const Reminder = require("../models/reminderdb")

// ✅ Create a new reminder
router.post("/", async (req, res) => {
  console.log("📝 Received reminder data:", req.body);
  try {
    // Validate required fields
    if (!req.body.studentId || !req.body.title || !req.body.description || !req.body.dateTime) {
      return res.status(400).json({ 
        error: "Missing required fields: studentId, title, description, and dateTime are required" 
      });
    }

    const reminder = new Reminder(req.body);
    await reminder.save();
    console.log("✅ Reminder created successfully:", reminder._id);
    res.status(201).json(reminder);
  } catch (err) {
    console.log("❌ Error creating reminder:", err.message);
    console.log("❌ Full error:", err);
    res.status(400).json({ error: err.message });
  }
});





router.get("/:studentId", async (req, res) => {
  try {
    const reminders = await Reminder.find({ studentId: req.params.studentId }).sort({ dateTime: 1 });
    res.json(reminders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update a reminder
router.put("/:id", async (req, res) => {
  try {
    const reminder = await Reminder.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(reminder);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ Delete a reminder
router.delete("/:id", async (req, res) => {
  try {
    await Reminder.findByIdAndDelete(req.params.id);
    res.json({ message: "Reminder deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/delete-reminder/:id", async (req, res) => {
  try {
    const reminderId = req.params.id;
    await Reminder.findByIdAndDelete(reminderId);

    res.send(`
      <div style="font-family: Arial, sans-serif; text-align: center; padding: 50px;">
        <h2 style="color: green;">✅ Reminder Deleted Successfully</h2>
        <p>You can now close this tab or go back to your dashboard.</p>
        // <a href="http://localhost:5173/student-dashboard" 
        <a href="http://localhost:5173/student-dashboard"
           style="display:inline-block; padding:10px 20px; background:#3b82f6; color:white; border-radius:6px; text-decoration:none;">
           Go to Dashboard
        </a>
      </div>
    `);
  } catch (error) {
    console.error("❌ Delete reminder error:", error);
    res.status(500).send("Failed to delete reminder.");
  }
});



module.exports = router;

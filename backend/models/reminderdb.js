const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dateTime: { type: Date, required: true },
  priority: { type: String, enum: ["High", "Medium", "Low"], default: "Low" },
  repeatType: { type: String, enum: ["None", "Daily", "Weekly", "Monthly"], default: "None" },
  isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model("Reminder", reminderSchema);


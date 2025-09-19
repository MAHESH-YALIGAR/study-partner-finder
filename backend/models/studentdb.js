const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Student", studentSchema);

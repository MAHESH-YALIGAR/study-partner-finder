// models/coursedb.js
const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   resources: [
//     {
//       title: String,
//       link: String,
//     },
//   ],
// });
const courseSchema = new mongoose.Schema({
  name: String,
  description: String,
  resources: [
    {
      title: String,   // Name of the resource (e.g., "Java Tutorial Video")
      link: String,    // The actual URL
      source: String,  // Where it came from (e.g., "YouTube", "Google", "Notes")
    },
  ],
});

module.exports = mongoose.model("Course", courseSchema);

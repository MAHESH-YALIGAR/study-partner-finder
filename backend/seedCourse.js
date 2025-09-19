// // seedCourse.js
// const mongoose = require("mongoose");
// const Course = require("./models/coursedb");

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/seedCourse", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err));
// mongoose.connection.once("open", async () => {
//   console.log("MongoDB connected");

//   const courses = [
//     {
//       name: "dsa",
//       description: "Data Structures and Algorithms",
//       resources: [
//         { title: "GeeksforGeeks DSA", link: "https://www.geeksforgeeks.org/data-structures/" },
//         { title: "LeetCode", link: "https://leetcode.com/" },
//       ],
//     },
//     {
//       name: "webdevelopment",
//       description: "Web Development course",
//       resources: [
//         { title: "MDN Web Docs", link: "https://developer.mozilla.org/en-US/docs/Learn" },
//         { title: "freeCodeCamp", link: "https://www.freecodecamp.org/" },
//       ],
//     },
//     {
//       name: "java",
//       description: "Java Programming",
//       resources: [
//         { title: "W3Schools Java", link: "https://www.w3schools.com/java/" },
//         { title: "JavaTpoint", link: "https://www.javatpoint.com/java-tutorial" },
//       ],
//     },
//   ];

//   try {
//     await Course.deleteMany({});
//     await Course.insertMany(courses);
//     console.log("Courses seeded successfully!");
//   } catch (err) {
//     console.error("Error seeding courses:", err);
//   } finally {
//     mongoose.connection.close();
//   }
// });

const express = require("express");
const router = express.Router();
const Course = require("../models/coursedb"); // Course collection use ಮಾಡ್ತೀವಿ
const courses = require("../seedCourse")
// const fetchTopYouTubeVideos=require("../jobs/youtube");




router.post("/recommond", async (req, res) => {
  try {
    const { courses } = req.body;
    if (!courses || courses.length === 0) {
      return res.status(400).json({ error: "No courses provided" });
    }


    const recommendations = courses.map((course) => ([
      {
        title: `Learn ${course} - Google`,
        link: `https://www.google.com/search?q=${encodeURIComponent(course + " course")}`,
        source: "Google"
      },
      {
        title: `Learn ${course} - YouTube`,
        link: `https://www.youtube.com/results?search_query=${encodeURIComponent(course + " course")}`,
        source: "YouTube"
      },
      {
        title: `Learn ${course} - Notes`,
        link: `https://www.google.com/search?q=${encodeURIComponent(course + " notes")}`,
        source: "Notes"
      },
      {
        title: `Take ${course} Quiz`,
        link: `https://www.proprofs.com/quiz-school/search.php?q=${encodeURIComponent(course)}`,
        source: "Quiz"
      },

      {
        title: ` ${course} Notes`,
        link: `https://www.google.com/search?q=${encodeURIComponent(course + " notes filetype:pdf")}`,
        source: "Google"
      },

      {
        title: `${course} Projects on GitHub`,
        link: `https://github.com/search?q=${encodeURIComponent(course + " projects")}`,
        source: "GitHub"
      },
      {
  title: `${course} Notes (Google Drive)`,
  link: `https://www.google.com/search?q=${encodeURIComponent(course + " notes filetype:pdf site:drive.google.com")}`,
  source: "Google Drive"
}

    ])).flat();


    res.json({ recommendations });
    // console.log("recomondestion on backend",{recommendations});
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ error: "Server error while generating recommendations" });
  }
});





module.exports = router;

// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const path=require("path");
// const multer=require("multer")
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
// console.log("this is file router");



// // Configure Multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => {
//     // unique filename: timestamp + original extension
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });


// router.post("/upload", upload.single("file"), (req, res) => {
//   if (!req.file) return res.status(400).json({ error: "No file uploaded" });
// console.log("you are in the file router ")
//   // Return file path to frontend
//   res.json({ filePath: `/uploads/${req.file.filename}` });
// });

// module.exports=router;




const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
console.log("✅ File router initialized");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter (optional: only images & pdf)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|pdf/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs allowed"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
  fileFilter,
});

// Upload route
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("📁 File uploaded:", req.file.filename);

  res.json({
    success: true,
    filePath: `/uploads/${req.file.filename}`, // path to access file
  });
});

module.exports = router;

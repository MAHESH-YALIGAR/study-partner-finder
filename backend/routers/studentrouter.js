const express= require("express");
const router=express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");
const Student=require("../models/studentdb")

// router.post()
router.get("/",(req,res)=>{
  res.send("you are  in my userrouter ")
})

// Get all students
router.get("/all", async (req, res) => {
  try {
    const students = await Student.find({}, { name: 1, email: 1, courses: 1 }).lean();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//for the singiup route
router.post("/signup", async (req, res) => {
  const { name, email, password, course } = req.body;
  console.log(req.body);
  try {
    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new Student({ name, email, password: hashedPassword, course });
    await student.save();

    res.status(201).json({ msg: "Student registered successfully" });
    console.log(req.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// for the Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ msg: "Student not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, student: { id: student._id, name: student.name, email: student.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
   

});


//for the logout the student
// inside student schema you may have refreshTokens: [String]

router.post("/logout",authMiddleware, async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ msg: "No refresh token provided" });
  }

  await Student.updateOne(
    { refreshTokens: refreshToken },
    { $pull: { refreshTokens: refreshToken } }
  );

  res.json({ msg: "Logged out successfully" });
});






router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
        console.log("this is the student ",student);

    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
    console.log("this is the student ",student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update courses by _id
router.put("/:id/courses", async (req, res) => {
  try {
    const { courses } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: { courses } },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//for the delete
router.put("/student/:id/courses", async (req, res) => {
  try {
    const { courses } = req.body;
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: { courses } },
      { new: true }
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports=router;
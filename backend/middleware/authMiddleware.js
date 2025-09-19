const jwt = require("jsonwebtoken");
const Student=require("../models/studentdb")


// const authMiddleware = (req, res, next) => {
//   const token = req.header("Authorization")?.replace("Bearer ", "");
//   console.log("your token",token)
//   if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.student = decoded; // decoded contains student id
//     next();
//   } catch (error) {
//     res.status(401).json({ msg: "Token is not valid" });
//   }
// };
const authMiddleware = (req, res, next) => {
  console.log("Middleware hit"); // should always print
  console.log("All headers:", req.headers);

  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: "No token, authorization denied" });

  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;
  console.log("Token received:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = decoded;
    next();
  } catch (error) {
    console.log("JWT error:", error.message);
    res.status(401).json({ msg: "Token is not valid" });
  }
};



module.exports = authMiddleware;

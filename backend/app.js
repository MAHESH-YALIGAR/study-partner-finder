require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const path=require("path")
const initSocket = require("./socket");
const mongoose=require("mongoose")
// const mongoose = require("mongoose");

const reminderrouter=require("./routers/reminderrouter")
const userrouter = require("./routers/studentrouter");
const recommendationRoutes = require("./routers/courserouter");
const filerouter=require("./routers/filerouter");
const chatrouter=require("./routers/chatrouter");
const chatgpt=require("./routers/chatgpt")
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

app.get("/", (req, res) => {
  res.send("You are in / home page");
});

// Routes
// app.use("/api/chatgpt", chatgpt);

app.use("/api/student", userrouter);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/reminder",reminderrouter);
app.use("/api/chat",filerouter);
app.use("/api/chat",chatrouter);
app.use("/api/chatgpt",chatgpt);


// this for the send the messege to the email 



// require("./jobs/reminderJob")
require("../backend/jobs/reminder")


const sendEmail = require("./utils/sendEmail");

// app.get("/test-email", async (req, res) => {
//   try {
//     await sendEmail("ym865482@gmail.com", "Test Email", "Hello from Study Partner!");
//     res.send("✅ Test email sent");
//   } catch (err) {
//     res.status(500).send("❌ Failed: " + err.message);
//   }
// });



// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected successfully"))
.catch(err => console.log("❌ MongoDB connection error:", err));

// Server listen
const PORT = process.env.PORT || 7000; // ✅ add fallback
server.listen(PORT, () => {  // ✅ should listen on "server" (http), not app
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});

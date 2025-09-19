
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast"; // ✅ import Toaster

import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/dashboard/Dashboard";
import Recommondection from "./components/pages/dashboard/Recommondection";
import Profile from "./components/pages/dashboard/Profile";
import ChatPage from "./components/pages/ChatPage";
import ReminderList from "./components/reminders/ReminderList";
import Chatgpt from "./components/pages/Chatgpt";
function App() {
  return (
    <Router>
      {/* Toaster for notifications with Tailwind colors */}
      <Toaster
        position="top-right"
        toastOptions={{
          // Default toast style
          style: {
            borderRadius: "0.5rem",
            padding: "1rem",
            background: "#1f2937", // Tailwind bg-gray-800
            color: "#f9fafb",      // Tailwind text-white
            fontWeight: "500",
          },
          success: {
            style: {
              background: "#16a34a", // Tailwind green-600
              color: "white",
            },
          },
          error: {
            style: {
              background: "#dc2626", // Tailwind red-600
              color: "white",
            },
          },
          // You can also define other types like info, warning
        }}
      />

      <Navbar />
      <div >
        <Chatgpt />
      </div>
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Recommondection" element={<Recommondection />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/chat"
            element={
              <ChatPage
                studentId={localStorage.getItem("studentId")}
                name={localStorage.getItem("studentName")}
              />
            }
          />
          <Route path="/ReminderList" element={<ReminderList />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

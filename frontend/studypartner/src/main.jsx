// import React from "react";
// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import SocketProvider from "./context/SocketContext";

// // Replace these with your real logged-in student info
// const studentId = "S101";
// const name = "Alice";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <SocketProvider studentId={studentId} name={name}>
//       <App />
//     </SocketProvider>
//   </StrictMode>
// );




import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import SocketProvider from "./context/SocketContext";

const studentId = localStorage.getItem("studentId");
const name = localStorage.getItem("studentName");

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {studentId && name ? (
      <SocketProvider studentId={studentId} name={name}>
        <App />
      </SocketProvider>
    ) : (
      <App />  // If not logged in, just render App (login/signup pages)
    )}
  </StrictMode>
);

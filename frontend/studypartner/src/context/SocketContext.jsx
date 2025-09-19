


// frontend/src/context/SocketContext.jsx
// import React, { createContext, useEffect } from "react";
// import { io } from "socket.io-client";

// export const SocketContext = createContext();

// const socket = io("http://localhost:7000");

// export default function SocketProvider({ children, studentId, name }) {
//   useEffect(() => {
//     if (studentId && name) {
//       socket.emit("register", { studentId, name });
//     }
//   }, [studentId, name]);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// }

// frontend/src/context/SocketContext.jsx
import React, { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();
const socket = io("http://localhost:7000");

export default function SocketProvider({ children, studentId, name }) {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Handle connection events
    socket.on("connect", () => {
      console.log("🔌 Socket connected:", socket.id);
      setIsConnected(true);
      // Register user immediately when connected
      if (studentId && name) {
        console.log("📝 Registering user on connect:", { studentId, name });
        socket.emit("register", { studentId, name });
      }
    });

    socket.on("disconnect", () => {
      console.log("🔌 Socket disconnected");
      setIsConnected(false);
    });

    // Listen for online users updates
    socket.on("online_users", (users) => {
      console.log("👥 Online users received:", users);
      console.log("👥 Online users count:", Object.keys(users).length);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("online_users");
    };
  }, [studentId, name]);

  // Re-register when studentId or name changes
  useEffect(() => {
    if (studentId && name && isConnected) {
      console.log("Re-registering user:", { studentId, name });
      socket.emit("register", { studentId, name });
    }
  }, [studentId, name]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

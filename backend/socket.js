


// // backend/initSocket.js
// const { Server } = require("socket.io");
// const chat=require("./models/chat");
// const users = {}; // { studentId: { socketId, name } }

// function initSocket(server) {
//   const io = new Server(server, {
//     cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
//   });

//   io.on("connection", (socket) => {
//     console.log("User connected:", socket.id);

//     // -----------------------------
//     // Register user
//     // -----------------------------
//     socket.on("register", ({ studentId, name }) => {
//       users[studentId] = { socketId: socket.id, name };
//       console.log(`✅ Registered: ${name} (${studentId})`);
//       io.emit("online_users", users); // optional: send online user list
//     });

//     // -----------------------------
//     // Join a group
//     // -----------------------------
//     socket.on("join_group", ({ groupId, studentId }) => {
//       socket.join(groupId);
//       console.log(`${studentId} joined group ${groupId}`);
//     });

//     // -----------------------------
//     // Group message
//     // -----------------------------
//     socket.on("send_group_message", ({ groupId, senderId, text, tempId, file }) => {
//       const senderName = users[senderId]?.name || "Unknown";

//       const payload = {
//         _id: Date.now().toString(),
//         tempId,
//         senderId,
//         senderName,
//         text,
//         file: file || null,
//         time: new Date().toISOString(),
//       };

//       // Emit to everyone in group including sender
//       io.to(groupId).emit("receive_group_message", payload);
//     });

//     // -----------------------------
//     // Private message (text + file)
//     // -----------------------------
//     socket.on("send_private_message", ({ from, fromName, to, text, tempId, file }) => {
//       const target = users[to];
//       const sender = users[from];

//       const payload = {
//         from,
//         fromName: fromName || sender?.name || "Unknown",
//         to,
//         text,
//         file: file || null, // include file path for images/files
//         tempId: tempId || Date.now().toString(),
//         time: new Date().toISOString(),
//       };

//       // Send to receiver
//       if (target) io.to(target.socketId).emit("receive_private_message", payload);

//       // Send back to sender (so it appears instantly in their chat)
//       if (sender) io.to(sender.socketId).emit("receive_private_message", payload);
//     });

//     // -----------------------------
//     // Disconnect
//     // -----------------------------
//     socket.on("disconnect", () => {
//       for (let id in users) {
//         if (users[id].socketId === socket.id) {
//           console.log(`❌ Disconnected: ${users[id].name}`);
//           delete users[id];
//           io.emit("online_users", users);
//           break;
//         }
//       }
//     });
//   });
// }

// module.exports = initSocket;





// backend/initSocket.js
const { Server } = require("socket.io");
const Chat = require("./models/chat"); // Mongoose model
const users = {}; // { studentId: { socketId, name } }

function initSocket(server) {
  const io = new Server(server, {
    cors: { origin: "http://localhost:5173", methods: ["GET", "POST"] },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // -----------------------------
    // Register user
    // -----------------------------
    socket.on("register", ({ studentId, name }) => {
      users[studentId] = { socketId: socket.id, name };
      console.log(`✅ Registered: ${name} (${studentId})`);
      io.emit("online_users", users); // optional: send online user list
    });

    // -----------------------------
    // Join a group
    // -----------------------------
    socket.on("join_group", ({ groupId, studentId }) => {
      socket.join(groupId);
      console.log(`${studentId} joined group ${groupId}`);
    });

    // -----------------------------
    // Group message (text + file)
    // -----------------------------
    socket.on("send_group_message", async ({ groupId, senderId, text, tempId, file }) => {
      const senderName = users[senderId]?.name || "Unknown";

      const payload = {
        _id: Date.now().toString(),
        tempId,
        senderId,
        senderName,
        text,
        file: file || null,
        time: new Date().toISOString(),
      };

      // Save group message to DB
      try {
        const chatDoc = new Chat({
          from: senderId,
          fromName: senderName,
          to: groupId, // for group, 'to' can be groupId
          text,
          file: file || null,
          time: new Date(),
        });
        await chatDoc.save();
        console.log("✅ Group message saved to DB");
      } catch (err) {
        console.error("❌ Failed to save group message:", err);
      }

      // Emit to everyone in group including sender
      io.to(groupId).emit("receive_group_message", payload);
    });

    // -----------------------------
    // Private message (text + file)
    // -----------------------------
    socket.on("send_private_message", async ({ from, fromName, to, text, tempId, file }) => {
      const target = users[to];
      const sender = users[from];

      const payload = {
        from,
        fromName: fromName || sender?.name || "Unknown",
        to,
        text,
        file: file || null,
        tempId: tempId || Date.now().toString(),
        time: new Date().toISOString(),
      };

      // Save private message to DB
      try {
        const chatDoc = new Chat(payload);
        await chatDoc.save();
        console.log("✅ Private message saved to DB");
      } catch (err) {
        console.error("❌ Failed to save private message:", err);
      }

      // Send to receiver
      if (target) io.to(target.socketId).emit("receive_private_message", payload);

      // Send back to sender (so it appears instantly in their chat)
      if (sender) io.to(sender.socketId).emit("receive_private_message", payload);
    });

    // -----------------------------
    // Disconnect
    // -----------------------------
    socket.on("disconnect", () => {
      for (let id in users) {
        if (users[id].socketId === socket.id) {
          console.log(`❌ Disconnected: ${users[id].name}`);
          delete users[id];
          io.emit("online_users", users);
          break;
        }
      }
    });
  });
}

module.exports = initSocket;

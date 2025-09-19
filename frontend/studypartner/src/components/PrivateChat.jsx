

// import React, { useState, useEffect, useContext, useRef } from "react";
// import { SocketContext } from "../context/SocketContext";
// import axios from "axios"; // for backend file upload

// export default function PrivateChat({ studentId, studentName, targetId, targetName }) {
//   const socket = useContext(SocketContext);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [file, setFile] = useState(null); // for file upload
//   const chatEndRef = useRef(null);
//   const [previewImage, setPreviewImage] = useState(null);


//   // Listen to private messages
//   useEffect(() => {
//     if (!socket) return;

//     const handlePrivateMessage = (data) => {
//       if (
//         (data.from === studentId && data.to === targetId) ||
//         (data.from === targetId && data.to === studentId)
//       ) {
//         setChat((prev) => [...prev, data]);
//       }
//     };

//     socket.on("receive_private_message", handlePrivateMessage);
//     return () => socket.off("receive_private_message", handlePrivateMessage);
//   }, [socket, studentId, targetId]);

//   // Send a message (text + optional file)
//   const sendMessage = async () => {
//     if (!message.trim() && !file) return; // don't send empty

//     // If file exists, send to backend first to get file path
//     let filePath = null;
//     if (file) {
//       console.log("you file is found ", file)
//       const formData = new FormData();
//       formData.append("file", file);
//       try {
//         const res = await axios.post(
//           "http://localhost:7000/api/chat/upload", // your backend route for file upload
//           formData,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         filePath = res.data.filePath; // returned from backend
//       } catch (err) {
//         console.error("File upload failed:", err);
//         return;
//       }
//     }

//     const msg = {
//       from: studentId,
//       fromName: studentName,
//       to: targetId,
//       text: message,
//       file: filePath, // null if no file
//       tempId: Date.now().toString(),
//       time: new Date().toISOString(),
//     };

//     // Emit via socket
//     socket.emit("send_private_message", msg);

//     // Add to local chat immediately
//     setChat((prev) => [...prev, msg]);

//     // Clear input
//     setMessage("");
//     setFile(null);
//   };

//   // Auto-scroll to bottom
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chat]);

//   return (
//     <div className="flex flex-col h-full w-full rounded-lg overflow-hidden relative font-sans">

//       {/* Chat Background */}
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-20"
//         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202224155-82e4e9efd4e1?auto=format&fit=crop&w=1470&q=80')" }}
//       ></div>

//       {/* Header */}
//       <div className="flex items-center justify-between p-3 bg-[#075E54] text-white shadow-md relative z-10">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
//             {targetName ? targetName[0] : 'U'}
//           </div>
//           <div>
//             <h3 className="font-semibold">{targetName || targetId}</h3>
//             <span className="text-xs opacity-75">Online</span>
//           </div>
//         </div>
//         <div className="flex gap-4 text-xl">
//           <button className="hover:scale-110 transition">📞</button>
//           <button className="hover:scale-110 transition">📹</button>
//           <button className="hover:scale-110 transition">⋮</button>
//         </div>
//       </div>

//       {/* Chat Area */}
//       <div className="flex-1 overflow-y-auto p-3 space-y-3 relative z-10">
//         {chat.length === 0 && (
//           <p className="text-center text-gray-500 mt-10 italic">
//             No messages yet. Start chatting!
//           </p>
//         )}



//           {chat.map((m, index) => (
//   <div
//     key={m._id || m.tempId || `${m.from}-${m.time}-${index}`}
//     className={`flex ${m.from === studentId ? "justify-end" : "justify-start"}`}
//   >
//     {m.from !== studentId && (
//       <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm mr-2">
//         {m.fromName ? m.fromName[0] : m.from[0]}
//       </div>
//     )}
//     <div
//       className={`px-3 py-2 max-w-xs rounded-lg text-sm relative shadow ${
//         m.from === studentId
//           ? "bg-[#DCF8C6] text-gray-900 rounded-br-none"
//           : "bg-white text-gray-800 rounded-bl-none"
//       }`}
//     >
//       <p className="leading-relaxed text-2xl">{m.text}</p>

//       {/* ✅ File / Image handling */}
//       {m.file && (
//         m.file.match(/\.(jpg|jpeg|png|gif)$/) ? (
//           <img
//             src={`http://localhost:7000${m.file}`}
//             alt="file"
//             className="rounded-lg mt-2 max-w-[200px] cursor-pointer hover:opacity-80 transition"
//             onClick={() => setPreviewImage(`http://localhost:7000${m.file}`)}
//           />
//         ) : (
//           <a
//             href={`http://localhost:7000${m.file}`}
//             download
//             className="text-blue-500 underline mt-2 block"
//           >
//             Download File
//           </a>
//         )
//       )}

//       <div className="flex justify-end text-[10px] mt-1 opacity-70 items-center gap-1">
//         <span>
//           {new Date(m.time).toLocaleTimeString([], {
//             hour: "2-digit",
//             minute: "2-digit",
//           })}
//         </span>
//         {m.from === studentId && (
//           <span className="text-blue-500 font-bold">✓✓</span>
//         )}
//       </div>
//     </div>
//   </div>
// ))}

// {/* ✅ Full-screen Image Preview Modal */}
// {previewImage && (
//   <div
//     className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
//     onClick={() => setPreviewImage(null)}
//   >
//     <img
//       src={previewImage}
//       alt="Preview"
//       className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
//     />
//     <button
//       className="absolute top-5 right-5 text-white text-3xl font-bold"
//       onClick={() => setPreviewImage(null)}
//     >
//       ✖
//     </button>
//   </div>
// )}




//         <div ref={chatEndRef} />
//       </div>

//       {/* Input Area */}
//       <div className="flex items-center gap-3 p-3 bg-[#f0f0f0] shadow-md relative z-10 rounded-lg">

//         <button className="text-3xl text-gray-600 hover:scale-110 transition-transform" title="Insert Emoji">😊</button>
//         <button className="text-3xl text-gray-600 hover:scale-110 transition-transform" title="Open Camera">📷</button>

//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//           placeholder="Type a message"
//           className="flex-grow px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
//           aria-label="Message input"
//         />

//         <button
//           onClick={sendMessage}
//           className="bg-[#25D366] text-white px-5 py-3 rounded-full font-semibold hover:bg-green-600 transition text-lg select-none"
//           aria-label="Send message"
//         >
//           ➤
//         </button>

//         {/* File upload button */}
//         <label
//           htmlFor="file-upload"
//           className="bg-[#2811ba] text-white px-5 py-3 rounded-full font-semibold cursor-pointer hover:bg-blue-600 transition text-lg select-none"
//         >
//           📁
//         </label>
//         <input
//           id="file-upload"
//           type="file"
//           onChange={(e) => setFile(e.target.files[0])}
//           className="hidden"
//           aria-label="Attach file"
//         />
//       </div>
//     </div>
//   );
// }









// src/components/PrivateChat.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import toast from "react-hot-toast";


export default function PrivateChat({ studentId, studentName, targetId, targetName }) {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const chatEndRef = useRef(null);

  // Listen for incoming private messages
  useEffect(() => {
    if (!socket) return;

    const handlePrivateMessage = (data) => {
      if (
        (data.from === studentId && data.to === targetId) ||
        (data.from === targetId && data.to === studentId)
      ) {
        console.log("Received message:", data);
        setChat((prev) => [...prev, data]);
      }
    };

    socket.on("receive_private_message", handlePrivateMessage);
    return () => socket.off("receive_private_message", handlePrivateMessage);
  }, [socket, studentId, targetId]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // Send message (text + optional file)
  const sendMessage = async () => {
    if (!message.trim() && !file) return;

    let filePath = null;
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axios.post(
          "http://localhost:7000/api/chat/upload",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        filePath = res.data.filePath;
        console.log("Uploaded file path:", filePath);
      } catch (err) {
        console.error("File upload failed:", err);
        return;
      }
    }

    const msg = {
      from: studentId,
      fromName: studentName,
      to: targetId,
      text: message,
      file: filePath,
      tempId: Date.now().toString(),
      time: new Date().toISOString(),
    };

    socket.emit("send_private_message", msg);
    setChat((prev) => [...prev, msg]);
    setMessage("");
    setFile(null);
  };


  useEffect(() => {
  const fetchChat = async () => {
    try {
      const res = await axios.get(
        `http://localhost:7000/api/chat/private/${studentId}/${targetId}`
      );
      setChat(res.data);
    } catch (err) {
      console.error("Failed to load chat:", err);
    }
  };

  fetchChat();
}, [studentId, targetId]);



// for the notification 


useEffect(() => {
  if (!socket) return;

  const handlePrivateMessage = (data) => {
    setChat(prev => [...prev, data]);
      console.log("thois  data.taxtn brpo",data);

    if (data.from !== studentId) {    // ನೀವು self send ಮಾಡಿದ್ದರೆ ತೋರಿಸದು
      toast(`New message from ${data.fromName}: ${data.text}`);
      console.log("thois  data.taxtn brpo",data.taxt);
    }
  };

  socket.on("receive_private_message", handlePrivateMessage);
  return () => socket.off("receive_private_message", handlePrivateMessage);
}, [socket, studentId]);





  return (
    <div className="flex flex-col h-full w-full rounded-lg overflow-hidden relative font-sans">
      
      {/* Chat Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522202224155-82e4e9efd4e1?auto=format&fit=crop&w=1470&q=80')" }}
      ></div>

      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-[#075E54] text-white shadow-md relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
            {targetName ? targetName[0] : 'U'}
          </div>
          <div>
            <h3 className="font-semibold">{targetName || targetId}</h3>
            <span className="text-xs opacity-75">Online</span>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 relative z-10">
        {chat.length === 0 && (
          <p className="text-center text-gray-500 mt-10 italic">
            No messages yet. Start chatting!
          </p>
        )}

        {chat.map((m, index) => (
          <div
            key={m._id || m.tempId || index}
            className={`flex ${m.from === studentId ? "justify-end" : "justify-start"}`}
          >
            {m.from !== studentId && (
              <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-sm mr-2">
                {m.fromName ? m.fromName[0] : m.from[0]}
              </div>
            )}
            <div className={`px-3 py-2 max-w-xs rounded-lg text-sm relative shadow ${
              m.from === studentId
                ? "bg-[#DCF8C6] text-gray-900 rounded-br-none"
                : "bg-white text-gray-800 rounded-bl-none"
            }`}>
              <p className="leading-relaxed text-2xl">{m.text}</p>

              {m.file && (
                m.file.match(/\.(jpg|jpeg|png|gif)$/) ? (
                  <img
                    src={`http://localhost:7000${m.file}`}
                    alt="file"
                    className="rounded-lg mt-2 max-w-[200px] cursor-pointer hover:opacity-80 transition"
                    onClick={() => setPreviewImage(`http://localhost:7000${m.file}`)}
                  />
                ) : (
                  <a
                    href={`http://localhost:7000${m.file}`}
                    download
                    className="text-blue-500 underline mt-2 block"
                  >
                    Download File
                  </a>
                )
              )}

              <div className="flex justify-end text-[10px] mt-1 opacity-70 items-center gap-1">
                <span>{new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                {m.from === studentId && <span className="text-blue-500 font-bold">✓✓</span>}
              </div>
            </div>
          </div>
        ))}

        {/* Full-screen Image Preview */}
        {previewImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
            onClick={() => setPreviewImage(null)}
          >
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-[90%] max-h-[90%] rounded-lg shadow-lg"
            />
            <button
              className="absolute top-5 right-5 text-white text-3xl font-bold"
              onClick={() => setPreviewImage(null)}
            >
              ✖
            </button>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex items-center gap-3 p-3 bg-[#f0f0f0] shadow-md relative z-10 rounded-lg">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
          className="flex-grow px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-lg"
        />
        <button
          onClick={sendMessage}
          className="bg-[#25D366] text-white px-5 py-3 rounded-full font-semibold hover:bg-green-600 transition text-lg select-none"
        >
          ➤
        </button>
        <label
          htmlFor="file-upload"
          className="bg-[#2811ba] text-white px-5 py-3 rounded-full font-semibold cursor-pointer hover:bg-blue-600 transition text-lg select-none"
        >
          📁
        </label>
        <input
          id="file-upload"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
      </div>
    </div>
  );
}


// import Draggable from "react-draggable";
// import React, { useState } from "react";
// import axios from "axios";
// import { Rnd } from "react-rnd";

// export default function AIChatBox() {
//   const [open, setOpen] = useState(false);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [dimensions, setDimensions] = useState({
//     width: 380, height: 480, x: 50, y: 50
//   });

//   const sendMessage = async () => {
//     if (!message.trim()) return;
//     try {
//       const res = await axios.post("http://localhost:7000/api/chatgpt", { message });
//       setChat([
//         ...chat,
//         { role: "user", text: message },
//         { role: "ai", text: res.data.reply },
//       ]);
//       setMessage("");
//     } catch (err) {
//       console.error("AI Request Error:", err);
//     }
//   };

//   return (
//     <>
//       {/* Floating Button */}
//       {!open && (
//         <button
//           onClick={() => setOpen(true)}
//           className="fixed bottom-5 h-20 w-20 m-20 right-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-lg"
//         >
//           💬
//         </button>
//       )}
//       {open && (
//         <Rnd
//           size={{ width: dimensions.width, height: dimensions.height }}
//           position={{ x: dimensions.x, y: dimensions.y }}
//           onDragStop={(e, d) => setDimensions(prev => ({ ...prev, x: d.x, y: d.y }))}
//           onResizeStop={(e, direction, ref, delta, position) => {
//             setDimensions({
//               width: ref.offsetWidth,
//               height: ref.offsetHeight,
//               x: position.x,
//               y: position.y
//             });
//           }}
//           minWidth={280}
//           minHeight={380}
//           bounds="window"
//           className="fixed z-50 bg-white shadow-2xl rounded-xl border flex flex-col"
//         >
//           <div className="flex flex-col h-full w-full">
//             {/* Header */}
//             <div className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-t-xl cursor-grab">
//               <h2 className="font-bold">📚 Study Assistant AI</h2>
//               <button onClick={() => setOpen(false)} className="font-bold hover:text-red-300">
//                 ✖
//               </button>
//             </div>
//             {/* Chat Messages */}
//             <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm bg-gray-50">
//               {chat.map((c, i) => (
//                 <p
//                   key={i}
//                   className={`p-2 rounded-lg max-w-[80%] ${
//                     c.role === "user"
//                       ? "ml-auto bg-indigo-100 text-indigo-800"
//                       : "mr-auto bg-green-100 text-green-800"
//                   }`}
//                 >
//                   <b>{c.role === "user" ? "You" : "AI"}:</b> {c.text}
//                 </p>
//               ))}
//             </div>
//             {/* Input Box */}
//             <div className="flex border-t p-2 bg-white">
//               <input
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 placeholder="Ask me anything about your studies..."
//                 className="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
//               />
//               <button
//                 onClick={sendMessage}
//                 className="ml-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:opacity-90"
//               >
//                 🚀
//               </button>
//             </div>
//           </div>
//         </Rnd>
//       )}
//     </>
//   );
// }















// AIChatBox.jsx
import React, { useState } from "react";
import axios from "axios";
import { Rnd } from "react-rnd";

export default function AIChatBox() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [dimensions, setDimensions] = useState({
    width: 400,
    height: 500,
    x: 80,
    y: 80,
  });

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      const res = await axios.post("http://localhost:7000/api/chatgpt", {
        message,
      });
      setChat([
        ...chat,
        { role: "user", text: message },
        { role: "ai", text: res.data.reply },
      ]);
      setMessage("");
    } catch (err) {
      console.error("AI Request Error:", err);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-8 right-8 h-20 w-20 flex items-center justify-center
          bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
          text-white text-3xl rounded-full shadow-xl animate-bounce 
          hover:scale-110 transform transition duration-300"
        >
          🤖
        </button>
      )}

      {/* Draggable + Resizable Chat Box */}
      {open && (
        <Rnd
          size={{ width: dimensions.width, height: dimensions.height }}
          position={{ x: dimensions.x, y: dimensions.y }}
          onDragStop={(e, d) =>
            setDimensions((prev) => ({ ...prev, x: d.x, y: d.y }))
          }
          onResizeStop={(e, direction, ref, delta, position) => {
            setDimensions({
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              x: position.x,
              y: position.y,
            });
          }}
          minWidth={320}
          minHeight={400}
          bounds="window"
          className="fixed z-50 bg-white shadow-2xl rounded-2xl border overflow-hidden"
        >
          <div className="flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex justify-between items-center 
              bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
              text-white px-4 py-3 rounded-t-2xl shadow-md cursor-grab">
              <h2 className="font-bold text-lg">📚 AI Study Assistant</h2>
              <button
                onClick={() => setOpen(false)}
                className="font-bold hover:text-red-300 text-xl"
              >
                ✖
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {chat.map((c, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl shadow-sm max-w-[75%] text-sm leading-relaxed ${
                    c.role === "user"
                      ? "ml-auto bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-800"
                      : "mr-auto bg-gradient-to-r from-green-100 to-green-200 text-green-800"
                  }`}
                >
                  <b>{c.role === "user" ? "You" : "AI"}:</b> {c.text}
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="flex border-t p-3 bg-white">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="💡 Ask me anything about your studies..."
                className="flex-1 border px-4 py-2 rounded-lg text-sm 
                  focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <button
                onClick={sendMessage}
                className="ml-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                  text-white px-4 py-2 rounded-lg shadow hover:scale-105 
                  transform transition duration-200"
              >
                🚀
              </button>
            </div>
          </div>
        </Rnd>
      )}
    </>
  );
}

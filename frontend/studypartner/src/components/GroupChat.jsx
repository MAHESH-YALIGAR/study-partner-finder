



import React, { useState, useEffect, useContext, useRef } from "react";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";

export default function GroupChat({ studentId, studentName, groupId = "global-study" }) {
  const socket = useContext(SocketContext);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [allStudents, setAllStudents] = useState([]);
  const [showFriendsList, setShowFriendsList] = useState(false);
  const chatEndRef = useRef(null);

  // helper to avoid duplicates (store ids or tempIds)
  const messageIdsRef = useRef(new Set());

  // Fetch students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:7000/api/student/all");
        setAllStudents(res.data.filter(s => s._id !== studentId));
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, [studentId]);

  // Join group on mount
  useEffect(() => {
    if (!socket) return;
    console.log("🔗 joining group:", groupId, "as", studentId);
    socket.emit("join_group", { groupId, studentId });

    return () => {
      socket.emit("leave_group", { groupId, studentId });
      console.log("🔌 left group:", groupId);
    };
  }, [socket, groupId, studentId]);

  // online users
  useEffect(() => {
    if (!socket) return;
    const onOnline = (users) => {
      console.log("👥 GroupChat: Online users received:", users);
      console.log("👥 GroupChat: Online users count:", Object.keys(users).length);
      setOnlineUsers(users);
    };
    socket.on("online_users", onOnline);
    return () => socket.off("online_users", onOnline);
  }, [socket]);

  // receive group messages (dedupe by _id or tempId)
  useEffect(() => {
    if (!socket) return;

    const handleGroupMessage = (data) => {
      // data should include either _id (saved id) or tempId (if client sent)
      const id = data._id ?? data.tempId ?? `${data.senderId}-${data.time}`;
      if (messageIdsRef.current.has(String(id))) {
        // already seen
        return;
      }
      messageIdsRef.current.add(String(id));
      setChat(prev => [...prev, data]);
    };

    socket.on("receive_group_message", handleGroupMessage);

    return () => {
      socket.off("receive_group_message", handleGroupMessage);
    };
  }, [socket]);

  // send message (optimistic + ack)
  const sendMessage = () => {
    if (!message.trim()) return;
    if (!socket || !socket.connected) return;

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
    const localMsg = {
      tempId,
      senderId: studentId,
      senderName: "You",
      text: message,
      time: new Date().toISOString(),
      pending: true
    };



    // show optimistic
    messageIdsRef.current.add(tempId);
    setChat(prev => [...prev, localMsg]);
    setMessage("");

    // Emit with callback ack (server should call ack with saved message)
    socket.emit("send_group_message", { groupId, senderId: studentId, text: localMsg.text, tempId }, (savedMessage) => {
      // savedMessage expected to include either _id or tempId and final time
      if (!savedMessage) return;
      const savedId = savedMessage._id ?? savedMessage.tempId;
      if (messageIdsRef.current.has(String(savedId))) {
        // replace optimistic entry if tempId matches
        setChat(prev => prev.map(m => {
          if (m.tempId && savedMessage.tempId && m.tempId === savedMessage.tempId) {
            return { ...savedMessage, senderName: "You" }; // replace
          }
          return m;
        }));
        messageIdsRef.current.add(String(savedId));
      } else {
        // append if not present
        messageIdsRef.current.add(String(savedId));
        setChat(prev => [...prev, savedMessage]);
      }
    });
  };

  // auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
  const fetchGroupMessages = async () => {
    try {
      const res = await axios.get(`http://localhost:7000/api/chat/group/${groupId}`);
      setChat(res.data);
    } catch (err) {
      console.error("Failed to load group messages:", err);
    }
  };

  fetchGroupMessages();
}, [groupId]);


  return (
   
    <div className="flex flex-col h-full w-full rounded-lg overflow-hidden shadow-lg">

  {/* Header */}
  <div className="bg-[#075E54] text-white p-5 rounded-t-lg flex justify-between items-center shadow-md">
    <div>
      <h3 className="font-bold text-2xl">Study Group Chat</h3>
      <p className="text-sm opacity-90 mt-1">
        {Object.keys(onlineUsers).length} online • {allStudents.length + 1} total students
      </p>
    </div>
    <button
      onClick={() => setShowFriendsList(!showFriendsList)}
      className="bg-white bg-opacity-20 hover:bg-opacity-40 transition px-4 py-2 rounded text-sm font-semibold shadow"
    >
      {showFriendsList ? 'Hide' : 'Show'} Friends
    </button>
  </div>

  <div className="flex flex-1">

    {/* Friends list sidebar */}
    {showFriendsList && (
      <div className="w-1/3 border-r border-gray-300 px-4 py-6 bg-gray-50 overflow-y-auto">
        <h4 className="text-lg font-semibold mb-4 text-gray-800 border-b border-gray-300 pb-2">
          All Students
        </h4>
        <div className="space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto">
          {allStudents.map(student => {
            const isOnline = !!onlineUsers[student._id];
            return (
              <div
                key={student._id}
                className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition ${
                  isOnline ? 'bg-green-100 border border-green-400' : 'bg-white border border-gray-200'
                } hover:bg-green-50`}
                title={isOnline ? 'Online' : 'Offline'}
              >
                <div>
                  <p className="font-semibold">{student.name}</p>
                  <p className="text-xs text-gray-600">{student.email}</p>
                </div>
                <span
                  className={`h-4 w-4 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-300'}`}
                ></span>
              </div>
            );
          })}
        </div>
      </div>
    )}

    {/* Chat area */}
    <div className="flex flex-col flex-1">

      {/* Connection status */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b border-gray-300 text-gray-700 text-sm font-medium">
        <div className="flex items-center space-x-3">
          <span className={`w-4 h-4 rounded-full ${socket?.connected ? 'bg-green-500' : 'bg-red-500'}`}></span>
          <span>{socket?.connected ? 'Connected' : 'Disconnected'}</span>
        </div>
        <span>Online: {Object.keys(onlineUsers).length}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-6 bg-white overflow-y-auto">
        {chat.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 text-gray-400 select-none h-full">
            <div className="text-5xl">👥</div>
            <p className="text-lg">No messages yet. Start the group conversation!</p>
          </div>
        ) : (
          chat.map((m, i) => (
            <div
              key={m._id ?? m.tempId ?? i}
              className={`flex mb-4 ${
                String(m.senderId) === String(studentId) ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs rounded-lg p-4 shadow-md ${
                  String(m.senderId) === String(studentId)
                    ? 'bg-[#DCF8C6] rounded-br-none text-gray-900'
                    : 'bg-white border border-gray-300 rounded-bl-none text-gray-800'
                }`}
              >
                <p className="text-xs font-semibold opacity-70 mb-1">
                  {String(m.senderId) === String(studentId) ? 'You' : m.senderName || m.senderId}
                </p>
                <p className="whitespace-pre-wrap">{m.text}</p>
                {m.pending && (
                  <p className="text-xs opacity-50 mt-1 italic">Sending...</p>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input bar */}
      <div className="flex items-center gap-3 px-6 py-4 bg-white border-t border-gray-300">
        <input
          type="text"
          className="flex-grow rounded-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Type a group message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          disabled={!socket?.connected}
        />
        <button
          onClick={sendMessage}
          disabled={!socket?.connected || !message.trim()}
          className={`px-6 py-2 rounded-full font-semibold transition ${
            socket?.connected && message.trim()
              ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Send
        </button>
      </div>

    </div>
  </div>
</div>

  );
}

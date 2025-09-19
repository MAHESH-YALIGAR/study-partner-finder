import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

export default function AddReminderModal({ studentId, onClose, onAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [priority, setPriority] = useState("Low");
  // const [repeatType, setRepeatType] = useState("none");
  const [repeatType, setRepeatType] = useState("None");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📝 Sending reminder data:", {
      studentId,
      title,
      description,
      dateTime,
      priority,
      repeatType,
    });
    
    try {
      const res = await axios.post("http://localhost:7000/api/reminder", {
        studentId,
        title,
        description: description || "No description", // Ensure description is not empty
        dateTime,
        priority,
        repeatType,
      });
      console.log("✅ Reminder created successfully:", res.data);
      onAdded(res.data);
      onClose();
    } catch (err) {
      console.error("❌ Error creating reminder:", err);
      console.error("❌ Error response:", err.response?.data);
    }
  };

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    //   <div className="bg-white rounded-lg p-6 w-96">
    //     <h2 className="text-xl font-bold mb-4">Add New Reminder</h2>
    //     <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    //       <input
    //         className="border p-2 rounded"
    //         placeholder="Title"
    //         value={title}
    //         onChange={(e) => setTitle(e.target.value)}
    //         required
    //       />
    //       <textarea
    //         className="border p-2 rounded"
    //         placeholder="Description"
    //         value={description}
    //         onChange={(e) => setDescription(e.target.value)}
    //       />
    //       <DatePicker
    //         selected={dateTime}
    //         onChange={(date) => setDateTime(date)}
    //         showTimeSelect
    //         dateFormat="Pp"
    //         className="border p-2 rounded"
    //       />
    //       <select
    //         className="border p-2 rounded"
    //         value={priority}
    //         onChange={(e) => setPriority(e.target.value)}
    //       >
    //         <option value="High">High 🔴</option>
    //         <option value="Medium">Medium 🟡</option>
    //         <option value="Low">Low 🟢</option>
    //       </select>
    //       <select
    //         className="border p-2 rounded"
    //         value={repeatType}
    //         onChange={(e) => setRepeatType(e.target.value)}
    //       >
    //         <option value="None">None</option>
    //         <option value="Daily">Daily</option>
    //         <option value="Weekly">Weekly</option>
    //         <option value="Monthly">Monthly</option>
    //       </select>
    //       <div className="flex justify-end gap-2 mt-2">
    //         <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300">
    //           Cancel
    //         </button>
    //         <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white">
    //           Add
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-gradient-to-tr from-blue-200 via-purple-200 to-pink-200 bg-opacity-60 backdrop-blur-md">
  <div className="bg-white/90 shadow-2xl rounded-3xl px-8 py-6 w-full max-w-md border-2 border-blue-200 ring-4 ring-purple-300/10 transition-all duration-300 animate__animated animate__fadeInDown">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-black text-blue-800 flex items-center gap-2">
        <span role="img" aria-label="add reminder">📝</span>
        Add New Reminder
      </h2>
      <button type="button" onClick={onClose} className="text-lg rounded-full bg-pink-100 hover:bg-pink-200 p-2 transition-all shadow">
        <span role="img" aria-label="close">✖️</span>
      </button>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
      <input
        className="border border-blue-200 focus:border-purple-400 bg-blue-50 rounded-xl px-4 py-2 font-semibold placeholder:text-blue-400 outline-none transition"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={40}
      />
      <textarea
        className="border border-blue-200 focus:border-purple-400 bg-blue-50 rounded-xl px-4 py-2 font-medium placeholder:text-blue-400 outline-none transition min-h-[48px]"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={200}
      />
      <DatePicker
        selected={dateTime}
        onChange={(date) => setDateTime(date)}
        showTimeSelect
        dateFormat="Pp"
        className="border border-blue-200 bg-blue-50 rounded-xl px-4 py-2 w-full focus:border-purple-400 text-blue-700 font-bold transition"
      />
      <div className="flex gap-2">
        <select
          className="border border-blue-200 bg-blue-50 rounded-xl px-2 py-2 focus:border-purple-400 text-blue-700 font-bold transition flex-1"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High 🔴</option>
          <option value="Medium">Medium 🟡</option>
          <option value="Low">Low 🟢</option>
        </select>
        <select
          className="border border-blue-200 bg-blue-50 rounded-xl px-2 py-2 focus:border-purple-400 text-blue-700 font-bold transition flex-1"
          value={repeatType}
          onChange={(e) => setRepeatType(e.target.value)}
        >
          <option value="None">None</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </select>
      </div>
      <div className="flex justify-end gap-3 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-xl bg-gray-100 text-blue-500 hover:bg-gray-200 border transition-all font-bold shadow-sm animate__animated animate__pulse"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 text-white font-black shadow-lg hover:scale-105 transition-all animate__animated animate__bounce"
        >
          <span role="img" aria-label="add">➕</span> Add
        </button>
      </div>
    </form>
  </div>
</div>

  );
}

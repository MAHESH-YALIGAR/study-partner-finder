
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReminderCard from "../reminders/ReminderCard";
import AddReminderModal from "../reminders/AddReminderModal";

export default function ReminderList() {
  const [reminders, setReminders] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Get studentId from localStorage
  const studentId = localStorage.getItem("studentId");

  // Fetch reminders for this student
  const fetchReminders = async () => {
    if (!studentId) return; // skip if not logged in
    try {
      const res = await axios.get(`http://localhost:7000/api/reminder/${studentId}`);
      setReminders(res.data);
    } catch (err) {
      console.error("Error fetching reminders:", err);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, [studentId]);

  // Toggle completion of reminder
  const handleComplete = async (id) => {
    const reminder = reminders.find((r) => r._id === id);
    if (!reminder) return;

    try {
      await axios.put(`http://localhost:7000/api/reminder/${id}`, {
        isCompleted: !reminder.isCompleted,
      });
      fetchReminders(); // refresh list
    } catch (err) {
      console.error("Error updating reminder:", err);
    }
  };

  // Delete reminder
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:7000/api/reminder/${id}`);
      fetchReminders(); // refresh list after deletion
    } catch (err) {
      console.error("Error deleting reminder:", err);
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gradient-to-tr from-blue-50 via-violet-100 to-pink-50 transition-colors">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold flex items-center gap-2 text-blue-700">
          <span role="img" aria-label="reminder">📅</span>
          My Reminders
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="px-6 py-2 rounded-full shadow-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-black text-md
                     transform transition duration-150 hover:scale-105 hover:shadow-blue-300/40 active:scale-95"
        >
          <span className="pr-2">➕</span> Add Reminder
        </button>
      </div>

      {reminders.length === 0 ? (
        <div className="flex flex-col items-center mt-8">
          <span className="text-5xl mb-2 animate-bounce">✨</span>
          <p className="text-gray-400 font-medium text-lg">No reminders yet. Add one!</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {reminders.map((reminder) => (
            <ReminderCard
              key={reminder._id}
              reminder={reminder}
              onComplete={handleComplete}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showModal && (
        <AddReminderModal
          studentId={studentId}
          onClose={() => setShowModal(false)}
          onAdded={(newReminder) => setReminders([...reminders, newReminder])}
        />
      )}
    </div>
  );
}

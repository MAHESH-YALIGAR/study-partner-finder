import React from "react";

export default function ReminderCard({ reminder, onComplete, onDelete }) {
  const { title, description, dateTime, priority, isCompleted } = reminder;

  const priorityColors = {
    High: "border-l-4 border-red-500 bg-red-100",
    Medium: "border-l-4 border-yellow-500 bg-yellow-100",
    Low: "border-l-4 border-green-500 bg-green-100",
  };

  return (

<div
  className="relative p-6 rounded-3xl shadow-2xl max-w-md mx-auto
             bg-gradient-to-br from-blue-50 via-white to-purple-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
             backdrop-blur-xl border border-white/40
             ring-2 ring-blue-300/70 hover:ring-blue-400 hover:shadow-blue-400
             hover:scale-105 hover:-translate-y-2 transition-all duration-300
             group cursor-pointer overflow-hidden"
>
  {/* Floating Badge */}
  <div className="absolute -top-5 -left-5 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500
                  text-white text-xs px-5 py-1 rounded-2xl shadow-lg animate-bounce font-bold uppercase">
    🎉 New Task!
  </div>

  {/* Decorative Confetti Glow */}
  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none 
                  bg-[radial-gradient(circle_at_top_left,rgba(255,0,150,0.25),transparent),
                      radial-gradient(circle_at_bottom_right,rgba(0,200,255,0.25),transparent)]
                  blur-3xl transition-all duration-500" />

  {/* Header Section */}
  <div className="flex items-center gap-6">
    <div
      className={`w-16 h-16 flex items-center justify-center rounded-full
                  bg-gradient-to-br from-blue-500 to-purple-700 shadow-xl
                  text-white text-4xl select-none transform-gpu
                  transition-all duration-500 group-hover:rotate-12 group-hover:scale-125`}
    >
      {isCompleted ? "🏆" : "📖"}
    </div>

    <div className="flex-1">
      <h3
        className={`font-extrabold text-2xl select-text tracking-wide
                    transition-all duration-300
                    ${isCompleted 
                      ? 'line-through text-gray-400' 
                      : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'}`}
      >
        {title}
      </h3>

      <p
        className={`mt-2 text-lg leading-snug select-text
                   transition-all duration-300
                   ${isCompleted 
                     ? 'line-through text-gray-400' 
                     : 'text-gray-800 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white'}`}
      >
        {description}
      </p>

      <p className="mt-3 text-sm text-blue-600 dark:text-blue-300 flex items-center gap-2 select-none font-medium">
        <span className="text-lg">⏰</span>
        {new Date(dateTime).toLocaleString()}
      </p>

      {priority === "high" && (
        <span
          className="inline-block mt-3 px-3 py-1 rounded-full shadow-md
                     bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold animate-pulse"
        >
          🔥 High Priority
        </span>
      )}
    </div>
  </div>

  {/* Progress Bar Gamification */}
  <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
    <div
      className={`h-full rounded-full transition-all duration-700
                  ${isCompleted
                    ? 'w-full bg-gradient-to-r from-green-400 to-green-600'
                    : 'w-2/3 bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse'}`}
    />
  </div>

  {/* Action Buttons */}
  <div className="mt-6 flex justify-end gap-4">
    <button
      onClick={() => onComplete(reminder._id)}
      className={`px-6 py-2 rounded-2xl font-bold transition-transform duration-200 ease-in-out 
                 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50
                 ${isCompleted
                   ? 'bg-gray-300 text-gray-600 hover:bg-gray-400 hover:shadow-md' 
                   : 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:scale-110 hover:shadow-green-400'}`}
    >
      {isCompleted ? "Undo" : "Mark Done ✅"}
    </button>

    <button
      onClick={() => onDelete(reminder._id)}
      className="px-6 py-2 rounded-2xl font-bold text-white shadow-lg hover:scale-110 
                 bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-red-400
                 focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50
                 transition-transform duration-200"
    >
      🗑 Delete
    </button>
  </div>

  {/* Footer Note - Motivation */}
  <p className="mt-5 text-center text-sm font-medium text-gray-600 dark:text-gray-300 italic">
    {isCompleted ? "✔ Great job! Keep it up 🎯" : "🚀 Stay focused, you’ve got this!"}
  </p>
</div>

  );
}

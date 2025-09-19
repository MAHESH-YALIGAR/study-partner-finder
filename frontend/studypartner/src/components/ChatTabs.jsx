export default function ChatTabs({ activeTab, setActiveTab }) {
  return (
    <div className="flex gap-2 p-2 bg-gray-100 border-b">
      <button
        className={`flex-1 p-3 rounded-lg font-medium transition ${
          activeTab === "private" 
            ? "bg-blue-500 text-white shadow-md" 
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setActiveTab("private")}
      >
        💬 Private Chat
      </button>
      <button
        className={`flex-1 p-3 rounded-lg font-medium transition ${
          activeTab === "group" 
            ? "bg-green-500 text-white shadow-md" 
            : "bg-white text-gray-700 hover:bg-gray-50"
        }`}
        onClick={() => setActiveTab("group")}
      >
        👥 Group Chat
      </button>
    </div>
  );
}

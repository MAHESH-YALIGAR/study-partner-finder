import React, { useState } from "react";
import ChatTabs from "../ChatTabs";
import GroupChat from "../GroupChat";
import PrivateChat from "../PrivateChat";
import StudentList from "../StudentList";

export default function ChatPage({ studentId, name }) {
  const [activeTab, setActiveTab] = useState("private");
  const [targetId, setTargetId] = useState(null);
  const [targetName, setTargetName] = useState(null);

  return (
    <div className="flex flex-col h-screen">
      {/* Header showing current user */}
      <div className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Chat - {name}</h1>
        <p className="text-sm opacity-90">Student ID: {studentId}</p>
      </div>

      {/* Tabs for switching */}
      <ChatTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex flex-1">
        {activeTab === "private" && (      
          <>
            <StudentList
              currentStudentId={studentId}  // logged-in student
              onSelect={(student) => {
                setTargetId(student.studentId);
                setTargetName(student.name);
              }}
            />
            {targetId && <PrivateChat studentId={studentId} studentName={name} targetId={targetId} targetName={targetName} />}
          </>
        )}
        {activeTab === "group" && (
          <div className="w-full">
            <GroupChat studentId={studentId} studentName={name} />
          </div>
        )}
      </div>
    </div>
  );
}


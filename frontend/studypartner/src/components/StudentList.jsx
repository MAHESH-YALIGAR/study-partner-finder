

import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

export default function StudentList({ currentStudentId, onSelect, selectedStudentId }) {
  const socket = useContext(SocketContext);
  const [students, setStudents] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});
  const [loading, setLoading] = useState(true);

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await fetch("http://localhost:7000/api/student/all");
        const data = await res.json();
        const filtered = data
          .filter(student => student._id !== currentStudentId)
          .map(student => ({
            ...student,
            studentId: student._id,
            isOnline: !!onlineUsers[student._id],
          }));
        const sorted = filtered.sort((a, b) => b.isOnline - a.isOnline); // Online first
        setStudents(sorted);
      } catch (err) {
        console.error("Error fetching students:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [currentStudentId, onlineUsers]);

  // Listen for online users from socket
  useEffect(() => {
    if (!socket) return;

    const handleOnlineUsers = (users) => {
      setOnlineUsers(users);
    };

    socket.on("online_users", handleOnlineUsers);
    return () => socket.off("online_users", handleOnlineUsers);
  }, [socket]);

  if (loading) return <div>Loading students...</div>;

  return (
    // <div className="w-1/3 border-r border-gray-300 p-4">
    //   <h2 className="text-xl font-bold mb-4">All Students</h2>
    //   <div className="space-y-2">
    //     {students.length === 0 && (
    //       <div className="text-center text-gray-500 py-4">No other students found</div>
    //     )}
    //     {students.map(student => (
    //       <div
    //         key={student.studentId}
    //         onClick={() => onSelect(student)}
    //         className={`p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors
    //           ${student.isOnline ? 'border-green-400 bg-green-50' : 'border-gray-200'}
    //           ${selectedStudentId === student.studentId ? 'bg-blue-100 border-blue-400' : ''}
    //         `}
    //       >
    //         <div className="flex items-center justify-between">
    //           <div>
    //             <p className="font-semibold">{student.name}</p>
    //             <p className="text-sm text-gray-600">{student.email}</p>
    //             {student.courses && student.courses.length > 0 && (
    //               <p className="text-xs text-blue-600">
    //                 Courses: {student.courses.join(", ")}
    //               </p>
    //             )}
    //           </div>
    //           <div className={`w-3 h-3 rounded-full ${student.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></div>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </div>






//     <div className="w-1/3 border-r border-gray-300 p-4 bg-[#ECE5DD] h-full overflow-y-auto">
//   <h2 className="text-xl font-bold mb-4 text-gray-800">All Students</h2>

//   <div className="space-y-2">
//     {students.length === 0 && (
//       <div className="text-center text-gray-500 py-4">No other students found</div>
//     )}

//     {students.map((student) => (
//       <div
//         key={student.studentId}
//         onClick={() => onSelect(student)}
//         className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors
//           ${selectedStudentId === student.studentId ? 'bg-[#DCF8C6]' : 'hover:bg-gray-200'}
//         `}
//       >
//         <div className="flex items-center gap-3">
//           {/* Avatar */}
//           <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
//               ${student.isOnline ? 'bg-green-500' : 'bg-gray-400'}
//           `}>
//             {student.name ? student.name[0] : 'U'}
//           </div>

//           <div className="flex flex-col">
//             <p className="font-semibold text-gray-800">{student.name}</p>
//             <p className="text-sm text-gray-600">{student.email}</p>
//             {student.courses && student.courses.length > 0 && (
//               <p className="text-xs text-gray-500">
//                 Courses: {student.courses.join(", ")}
//               </p>
//             )}
//           </div>
//         </div>

//         {/* Online indicator */}
//         <div className={`w-3 h-3 rounded-full ${student.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}></div>
//       </div>
//     ))}
//   </div>
// </div>












<div className="w-1/3 border-r border-gray-300 p-4 bg-white overflow-y-auto max-h-[calc(100vh-100px)]">
  <h2 className="text-xl font-bold mb-5 border-b pb-3 text-gray-900">All Students</h2>
  <div className="space-y-2">
    {students.length === 0 && (
      <div className="text-center text-gray-400 py-6 select-none">No other students found</div>
    )}
    {students.map(student => {
      const isSelected = selectedStudentId === student.studentId;
      return (
        <div
          key={student.studentId}
          onClick={() => onSelect(student)}
          className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition duration-150
            ${student.isOnline ? 'bg-green-50 border border-green-400 hover:bg-green-100' : 'border border-gray-200 hover:bg-gray-100'}
            ${isSelected ? 'bg-blue-100 border-blue-400 hover:bg-blue-150' : ''}
          `}
          title={student.isOnline ? 'Online' : 'Offline'}
        >
          <div className="flex flex-col space-y-0.5">
            <p className="text-gray-900 font-semibold">{student.name}</p>
            <p className="text-xs text-gray-500">{student.email}</p>
            {student.courses && student.courses.length > 0 && (
              <p className="text-xs text-blue-600 truncate max-w-[14rem]" title={student.courses.join(", ")}>
                Courses: {student.courses.join(", ")}
              </p>
            )}
          </div>
          <span
            className={`w-3 h-3 rounded-full shrink-0 ${student.isOnline ? 'bg-green-500' : 'bg-gray-300'}`}
            aria-label={student.isOnline ? 'Online' : 'Offline'}
          ></span>
        </div>
      );
    })}
  </div>
</div>

  );
}

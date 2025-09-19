import React, { useEffect, useState } from "react";
import axios from "axios";
import Recommondection from "./Recommondection";
import { Navigate, useNavigate } from "react-router-dom";
const Profile = ({ onNext }) => {
  const studentId = localStorage.getItem("studentId"); // MUST be set on login
  const [profile, setProfile] = useState(null);
  const [newCourse, setNewCourse] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    if (!studentId) return;
    axios
      .get(`/api/student/${studentId}`)
      .then((res) => {
        setProfile({ ...res.data, courses: res.data.courses || [] });
      })
      .catch((err) => console.log(err.response?.data));
  }, [studentId]);

  const addCourse = () => {
    if (!newCourse.trim()) return;
    const updatedCourses = [...profile.courses, newCourse];

    axios
      .put(`/api/student/${studentId}/courses`, { courses: updatedCourses })
      .then((res) => {
        setProfile({ ...res.data, courses: res.data.courses || [] });
        setNewCourse("");
      })
      .catch((err) => console.log(err.response?.data));
  };

  const deleteCourse = (courseToDelete) => {
    const updatedCourses = profile.courses.filter((c) => c !== courseToDelete);

    axios
      .put(`/api/student/${studentId}/courses`, { courses: updatedCourses })
      .then((res) => {
        setProfile({ ...res.data, courses: res.data.courses || [] });
      })
      .catch((err) => console.log(err.response?.data));
  };

  if (!profile) return <p>Loading...</p>;
  function submit() {
    onNext()
  }

  //for the student list 
  
  return (
    <>
      <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-2xl shadow-lg max-w-xl mx-auto border border-gray-200">
        {/* Avatar + Name */}
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {profile.name?.[0] ||
              localStorage.getItem("studentName")?.[0] ||
              "S"}
          </div>
          <h2 className="text-3xl font-extrabold text-indigo-700 tracking-wider">
            My Profile
          </h2>
          <p className="text-gray-600 mt-1 italic">Welcome, learner!</p>
        </div>

        {/* Profile Info */}
        <div className="bg-white p-6 rounded-lg shadow-sm space-y-3">
          <p className="text-lg">
            <span className="font-semibold text-indigo-600">Name:</span>{" "}
            {profile.name || localStorage.getItem("studentName")}
          </p>
          <p className="text-lg">
            <span className="font-semibold text-indigo-600">Student ID:</span>{" "}
            {studentId}
          </p>
          <div className="text-lg">
            <span className="font-semibold text-indigo-600">
              Interested Courses:
            </span>{" "}
            {Array.isArray(profile.courses) && profile.courses.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {profile.courses.map((course, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md"
                  >
                    <span className="text-gray-800">{course}</span>
                    <button
                      onClick={() => deleteCourse(course)}
                      className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-400">No courses yet</span>
            )}
          </div>
        </div>

        {/* Add Course Section */}
        <div className="mt-6 bg-white p-6 rounded-lg shadow-md border border-indigo-100">
          <h3 className="text-xl font-semibold text-indigo-700 mb-3">
            Add a New Course
          </h3>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter new course"
              value={newCourse}
              onChange={(e) => setNewCourse(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg w-2/3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              onClick={addCourse}
              className="ml-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow transition duration-200"
            >
              Add
            </button>
          </div>
        </div>



        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-500">
          Keep learning and growing 🚀
        </div>
      </div>
    

    </>
  );
};

export default Profile;


import React, { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./Profile";
import Recommondection from "./Recommondection";

function Dashboard() {
  const [profile, setProfile] = useState({});
  const [showRecommendation, setShowRecommendation] = useState(false);
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (!studentId) return;
    axios
      .get(`/api/student/${studentId}`)
      .then((res) => {
        console.log("Student Data:", res.data);
        setProfile({ ...res.data, courses: res.data.courses || [] });
      })
      .catch((err) => console.log(err.response?.data));
  }, [studentId]);

  return (
    <div className="p-6">
      {/* If profile is showing */}
      {!showRecommendation ? (
        <div>
          <Profile profile={profile} />
          <button
  onClick={() => setShowRecommendation(true)}
  className="mt-4 ml-[800px] px-7 py-3 rounded-xl font-semibold text-white
             bg-gradient-to-r from-purple-600 via-pink-500 to-red-500
             shadow-lg shadow-pink-400/50
             transform transition duration-300 ease-in-out
             hover:scale-110 hover:shadow-xl hover:shadow-red-500/70
             active:scale-95 active:opacity-80
             focus:outline-none focus:ring-4 focus:ring-pink-300"
>
  See Recommendations
</button>


        </div>
      ) : (
        // If recommendations are showing
        <div>
          <Recommondection studentCourses={profile.courses || []} />
          <button
            onClick={() => setShowRecommendation(false)}
            className="mt-0 ml-[800px] px-7 py-3 rounded-xl font-semibold text-white
             bg-gradient-to-r from-purple-600 via-pink-500 to-red-500
             shadow-lg shadow-pink-400/50
             transform transition duration-300 ease-in-out
             hover:scale-110 hover:shadow-xl hover:shadow-red-500/70
             active:scale-95 active:opacity-80
             focus:outline-none focus:ring-4 focus:ring-pink-300"
          >
            ← Back to Profile
          </button>

        </div>
      )}
    </div>
  );
}

export default Dashboard;


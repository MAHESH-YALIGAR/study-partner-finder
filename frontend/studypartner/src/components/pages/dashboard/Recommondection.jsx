import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Recommondection({ studentCourses, onNext }) {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const courses = studentCourses?.length
      ? studentCourses
      : JSON.parse(localStorage.getItem("studentCourses") || "[]");

    console.log("Courses passed to recommendation:", courses);

    if (!courses || courses.length === 0) return;

    axios
      .post("/api/recommendations/recommond", { courses })
      .then((res) => {
        setRecommendations(res.data.recommendations || []);
        console.log("Recommendations received from server:", res.data.recommendations);
      })
      .catch((err) => console.error("Error fetching recommendations:", err));
  }, [studentCourses]);

  const handleSubmitAndNext = () => {
    navigate("/profile"); // navigate to profile
    if (onNext) onNext(); // call parent function if provided
  };

  //for the studentlist

  return (
    <>
      <div className="space-y-8 max-w-4xl mx-auto p-6">
        <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 p-8 rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
          <h1 className="text-3xl font-extrabold text-indigo-700 mb-5 tracking-tight drop-shadow-md">
            This is my recommendation page
          </h1>

          {recommendations.length > 0 ? (
            <ul className="list-disc pl-6 space-y-4 text-gray-800 text-lg">
              {recommendations.map((rec, index) => (
              
                <li
                  key={index}
                  className="hover:bg-indigo-100 rounded-md p-2 transition-colors duration-300 cursor-pointer"
                >
                  <a
                    href={rec.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-indigo-900 hover:text-indigo-800 transition-colors"
                  >
                    {rec.title}
                  </a>{" "}
                  <span className="text-indigo-600">({rec.source})</span>
                </li>

              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic text-lg">No recommendations available yet.</p>
          )}
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border border-indigo-100">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 drop-shadow-sm">
            Recommended Resources
          </h2>
          {/* Additional resources content can go here */}
        </div>

        <button
          onClick={handleSubmitAndNext}
          className=""
        >

        </button>
      </div>

    </>
  );
}

export default Recommondection;




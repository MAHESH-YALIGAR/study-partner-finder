// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-12 py-20">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-lg"
        >
          <h2 className="text-5xl font-extrabold text-indigo-700 leading-tight">
            Find Your Perfect <span className="text-pink-600">Study Partner</span>
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            Connect with like-minded students, collaborate on projects,
            share knowledge, and grow together.
          </p>
          <div className="mt-8 flex space-x-4">
            <Link
              to="/signup"
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 transition"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 bg-pink-500 text-white rounded-xl shadow-md hover:bg-pink-600 transition"
            >
              Login
            </Link>
          </div>
        </motion.div>

        <motion.img
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          src="https://img.freepik.com/free-vector/students-study-together-online-learning_74855-11059.jpg"
          alt="study-partner"
          className="w-[450px] rounded-2xl shadow-lg mt-10 md:mt-0"
        />
      </section>

      {/* Features Section */}
      <section className="px-12 py-16 bg-white bg-opacity-60">
        <h3 className="text-3xl font-bold text-center text-indigo-700">
          Why Choose StudyPartner?
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-2xl shadow-md text-center"
          >
            <h4 className="text-xl font-semibold text-indigo-600">Find Partners</h4>
            <p className="mt-3 text-gray-600">
              Match with students who share your interests and goals.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-2xl shadow-md text-center"
          >
            <h4 className="text-xl font-semibold text-pink-600">Collaborate</h4>
            <p className="mt-3 text-gray-600">
              Work together on assignments, projects, and competitive exams.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white rounded-2xl shadow-md text-center"
          >
            <h4 className="text-xl font-semibold text-green-600">Grow Faster</h4>
            <p className="mt-3 text-gray-600">
              Learn from peers, share resources, and achieve success together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white py-6 mt-12 text-center">
        <p>© {new Date().getFullYear()} StudyPartner | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default Home;

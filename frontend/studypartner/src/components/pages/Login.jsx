// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = e => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

  
//   const handleSubmit = async e => {
//   e.preventDefault();
//   try {
//     const res = await axios.post("http://localhost:7000/api/student/login", form, {
//       headers: { "Content-Type": "application/json" }
//     });

//     // ✅ Save token
//     localStorage.setItem("token", res.data.token);

//     // ✅ Save logged-in student id (_id from MongoDB)
//     localStorage.setItem("studentId", res.data.student.id);

//     // ✅ Save name/email if you want to display later
//     localStorage.setItem("studentName", res.data.student.name);
//     localStorage.setItem("studentEmail", res.data.student.email);

//     alert("Login successful!");
//     navigate("/dashboard"); // Redirect to dashboard
//   } catch (err) {
//     alert(err.response?.data?.msg || "Login failed");
//   }
// };


//   return (
// <div
//   className="flex justify-center items-center min-h-screen"
//   style={{
//     backgroundImage:
//       "linear-gradient(rgba(245,245,255,0.85), rgba(220,240,255,0.8)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1080&q=80')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   }}
// >
 

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white bg-opacity-75 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md mx-4"
//       >
//         <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 bg-clip-text text-transparent">
//           Student Login
//         </h2>

//         <div className="mb-6">
//           <label className="block mb-2 font-semibold text-gray-800">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//             required
//             placeholder="Enter your email"
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:outline-none transition"
//           />
//         </div>

//         <div className="mb-8">
//           <label className="block mb-2 font-semibold text-gray-800">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//             required
//             placeholder="Enter your password"
//             className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-pink-300 focus:outline-none transition"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transform transition"
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:7000/api/student/login", form, {
        headers: { "Content-Type": "application/json" }
      });

      // ✅ Save token & user info
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("studentId", res.data.student.id);
      localStorage.setItem("studentName", res.data.student.name);
      localStorage.setItem("studentEmail", res.data.student.email);

      // ✅ Notify Navbar immediately (no refresh needed)
      window.dispatchEvent(new Event("storage"));

      alert("Login successful!");
      navigate("/dashboard"); // Redirect to dashboard
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{
        backgroundImage:
          "linear-gradient(rgba(245,245,255,0.85), rgba(220,240,255,0.8)), url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1080&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-75 backdrop-blur-md p-10 rounded-3xl shadow-2xl w-full max-w-md mx-4"
      >
        <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-700 via-pink-700 to-red-700 bg-clip-text text-transparent">
          Student Login
        </h2>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-800">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-purple-300 focus:outline-none transition"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 font-semibold text-gray-800">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-pink-300 focus:outline-none transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transform transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;

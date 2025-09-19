// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const studentId = localStorage.getItem("studentId");
//     setIsLoggedIn(!!studentId);
//   }, []);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const handleLogout = async () => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");

//       if (refreshToken) {
//         await axios.post("/api/student/logout", { refreshToken });
//       }

//       localStorage.clear(); // remove student data
//       setIsLoggedIn(false);
//       navigate("/"); // redirect to login page
//     } catch (err) {
//       console.error("Logout error:", err);
//       alert("Logout failed, try again!");
//     }
//   };

//   return (
//     <nav
//       className={`w-full transition-all duration-300 ${scrolled ? "fixed top-0 left-0 z-50 shadow-xl" : "relative"
//         } bg-gradient-to-r from-green-400 via-blue-500 to-purple-500`}
//     >
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="flex justify-between items-center h-20">
//           {/* Logo */}
//           <div className="flex items-center space-x-3">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3135/3135810.png"
//               alt="logo"
//               className="h-12 w-12 rounded-full bg-white p-1"
//             />
//             <span className="text-2xl md:text-3xl font-bold text-white">
//               StudyPartner Platform
//             </span>
//           </div>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex space-x-6 text-lg font-semibold text-white">
//             <Link to="/" className="hover:text-yellow-300">Home</Link>

//             {!isLoggedIn ? (
//               <>
//                 <Link to="/signup" className="hover:text-yellow-300">Signup</Link>
//                 <Link to="/login" className="hover:text-yellow-300">Login</Link>
//               </>
//             ) : (
//               <>
//                 <Link to="/dashboard" className="hover:text-yellow-300">Dashboard</Link>
//                 <button
//                   onClick={handleLogout}
//                   className="hover:text-yellow-300"
//                 >
//                   Logout
//                 </button>
//                    <Link to="/chat" className="hover:text-yellow-300">
//                 Chat
//               </Link>
//                 <Link to="/ReminderList" className="hover:text-yellow-300">
//                 Reminder
//               </Link>
//               </>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <button onClick={toggleMenu} className="text-white">
//               <svg
//                 className="h-8 w-8"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 {isOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <div className="md:hidden bg-gradient-to-b from-green-400 via-blue-500 to-purple-500 px-4 py-3 space-y-3 text-white">
//           <Link to="/" className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition">
//             Home
//           </Link>

//           {!isLoggedIn ? (
//             <>
//               <Link to="/signup" className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition">
//                 Signup
//               </Link>
//               <Link to="/login" className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition">
//                 Login
//               </Link>
//             </>
//           ) : (
//             <>
//               <Link to="/dashboard" className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition">
//                 Dashboard
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-left bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-lg shadow-md transition duration-200"
//               >
//                 Logout
//               </button>
//              <Link to="/chat" className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition">
//                 Chat
//               </Link>
//             </>
//           )}
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;


import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("studentId") // ✅ check immediately
  );

  const navigate = useNavigate();

  // ✅ Keep login state in sync with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const studentId = localStorage.getItem("studentId");
      setIsLoggedIn(!!studentId);
    };

    // run once on mount
    handleStorageChange();

    // listen for login/logout changes
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (refreshToken) {
        await axios.post("/api/student/logout", { refreshToken });
      }

      localStorage.clear(); // remove student data
      setIsLoggedIn(false);

      // 🔔 notify all components immediately
      window.dispatchEvent(new Event("storage"));

      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
      alert("Logout failed, try again!");
    }
  };

  return (
    <nav
      className={`w-full transition-all duration-300 ${
        scrolled ? "fixed top-0 left-0 z-50 shadow-xl" : "relative"
      } bg-gradient-to-r from-green-400 via-blue-500 to-purple-500`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135810.png"
              alt="logo"
              className="h-12 w-12 rounded-full bg-white p-1"
            />
            <span className="text-2xl md:text-3xl font-bold text-white">
              StudyPartner Platform
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-lg font-semibold text-white">
            <Link to="/" className="hover:text-yellow-300">
              Home
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/signup" className="hover:text-yellow-300">
                  Signup
                </Link>
                <Link to="/login" className="hover:text-yellow-300">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-yellow-300">
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-300"
                >
                  Logout
                </button>
                <Link to="/chat" className="hover:text-yellow-300">
                  Chat
                </Link>
                <Link to="/ReminderList" className="hover:text-yellow-300">
                  Reminder
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-green-400 via-blue-500 to-purple-500 px-4 py-3 space-y-3 text-white">
          <Link
            to="/"
            className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition"
          >
            Home
          </Link>

          {!isLoggedIn ? (
            <>
              <Link
                to="/signup"
                className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition"
              >
                Signup
              </Link>
              <Link
                to="/login"
                className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition"
              >
                Login
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/dashboard"
                className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left bg-red-500 hover:bg-red-600 text-white font-semibold px-3 py-2 rounded-lg shadow-md transition duration-200"
              >
                Logout
              </button>
              <Link
                to="/chat"
                className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition"
              >
                Chat
              </Link>
              <Link
                to="/ReminderList"
                className="block hover:bg-white hover:text-blue-600 px-3 py-2 rounded-lg transition"
              >
                Reminder
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

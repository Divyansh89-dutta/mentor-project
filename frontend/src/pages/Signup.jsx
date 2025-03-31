import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaGoogle, FaApple } from "react-icons/fa";
import env from "react-dotenv";
// import dotenv from "dotenv";
// dotenv.config();

export default function Signup() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
       'https://mentor-project.onrender.com/api/auth/register', // Use VITE_API_URL instead of REACT_APP_API_URL
        { name, lastName, email, password },
        { withCredentials: true }
      );
      
      
      navigate("/login");
    } catch (error) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="flex w-full max-w-4xl bg-gray-800 rounded-lg p-4 shadow-lg overflow-hidden">
        {/* Left Side - Image */}
        <div
          className="hidden md:block rounded-2xl md:w-1/2 bg-cover bg-center relative"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1715331998698-09378555bd0f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h2 className="text-black text-2xl font-bold">
              Capturing Moments, Creating Memories
            </h2>
          </div>
        </div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full md:w-1/2 p-8"
        >
          <h1 className="text-3xl font-bold text-white text-center mb-6">
            Create an account
          </h1>
          <p className="text-gray-400 text-center mb-4">
            Already have an account?{" "}
            <a href="/login" className="text-purple-400">
              Log in
            </a>
          </p>
          <form onSubmit={handleSignup}>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 p-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg mt-4 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg mt-4 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex items-center mt-4">
              <input type="checkbox" id="terms" className="mr-2" required />
              <label htmlFor="terms" className="text-gray-400 text-sm">
                I agree to the{" "}
                <a href="#" className="text-purple-400">
                  Terms & Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-500 text-white p-3 rounded-lg mt-4 hover:bg-purple-600 transition"
            >
              Create account
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

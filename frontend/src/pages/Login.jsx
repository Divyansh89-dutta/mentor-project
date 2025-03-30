import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export default function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-800 p-10 rounded-2xl shadow-xl relative overflow-hidden flex flex-col items-center"
      >
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ delay: 0.2, duration: 0.5 }}
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500"
        ></motion.div>

        <h1 className="text-3xl font-bold text-center text-white mb-6">Sign In</h1>
        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div className="relative w-full">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative w-full">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700 text-white shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <motion.button 
            type="submit" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center font-semibold text-lg"
          >
            {loading ? <span className="animate-spin h-6 w-6 border-b-2 border-white"></span> : "Login"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

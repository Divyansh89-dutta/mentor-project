import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { FaGoogle, FaApple } from "react-icons/fa";

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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="flex lg:h-[59vh] w-full max-w-4xl p-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="relative rounded-2xl hidden md:block md:w-1/2" 
     style={{ 
       background: `url("https://images.unsplash.com/photo-1694590000075-8ece6e2a2fc5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D") center/cover no-repeat`
     }}>
  <div className="absolute inset-0 flex flex-col justify-end p-6">
    <h2 className="text-black text-4xl font-bold">Welcome Back!</h2>
  </div>
</div>


        {/* Right Side - Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col gap-2 md:w-1/2 p-8"
        >
          <h1 className="text-3xl font-bold text-white text-center mb-6">Login</h1>
          <p className="text-gray-400 text-center mb-4">Don't have an account? <Link to="/signup" className="text-purple-400">Sign up</Link></p>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white mb-4" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <input type="password" placeholder="Password" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white mb-4" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit" className="w-full bg-purple-500 text-white p-3 rounded-lg mt-4 hover:bg-purple-600 transition flex items-center justify-center">
              {loading ? <span className="animate-spin h-6 w-6 border-b-2 border-white"></span> : "Login"}
            </button>
          </form>
          
          
        </motion.div>
      </div>
    </div>
  );
}

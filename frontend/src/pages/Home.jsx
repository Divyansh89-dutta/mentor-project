import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6 text-white">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="text-5xl font-extrabold mb-6 drop-shadow-lg"
      >
        Welcome to Recipe Generator
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-lg mb-8 text-gray-300 text-center max-w-xl"
      >
        Create and save unique recipes based on your ingredients with ease.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex space-x-6"
      >
        <Link
          to="/recipe-form"
          className="bg-gradient-to-r from-gray-700 to-gray-500 text-white py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-105 text-lg font-semibold"
        >
          Generate Recipe
        </Link>
        <Link
          to="/saved-recipes"
          className="bg-gradient-to-r from-gray-600 to-gray-400 text-white py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-105 text-lg font-semibold"
        >
          View Saved Recipes
        </Link>
      </motion.div>
    </div>
  );
} 
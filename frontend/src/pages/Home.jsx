import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-200 text-black p-8">
      <div className="text-center mb-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-extrabold leading-tight"
        >
          REVOLUTIONIZE <br />
          <span className="text-gray-600">LEARNING</span>{" "}
          <span className="inline-block px-3 py-1 border rounded-full text-sm">
            WITH
          </span>
          <br />
          AI-DRIVEN <span className="text-gray-600">EDUCATION</span>
        </motion.h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-black text-white rounded-2xl p-8 shadow-lg flex flex-col justify-between"
        >
          <h2 className="text-xl font-bold">Welcome</h2>
          <p className="text-sm mt-4">
            Discover a new way of learning with our AI-powered online platform.
            Achieve your goals and succeed with us.
          </p>
          <div className="mt-6">
            <span className="inline-block bg-gray-800 px-4 py-1 rounded-full text-sm">
              Start Now
            </span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-lime-200 rounded-2xl p-8 shadow-lg flex flex-col justify-between"
        >
          <div className="flex space-x-2">
            <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
              Personalized learning
            </span>
            <span className="bg-gray-300 text-black px-3 py-1 rounded-full text-sm">
              Online education
            </span>
            <span className="bg-gray-300 text-black px-3 py-1 rounded-full text-sm">
              AI
            </span>
          </div>
          <h2 className="text-4xl font-bold mt-4">Flexible</h2>
          <p className="text-gray-700 mt-4">
            Our cutting-edge technology adapts to your needs and provides a
            tailored curriculum that helps you succeed. Experience the future of
            education today.
          </p>
          <Link
            to="/explore"
            className="mt-6 inline-block text-lg font-semibold bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition"
          >
            Learn More →
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 rounded-2xl p-8 shadow-lg"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">Expoler the World</h2>
              <p className="text-gray-600">Let's get Started</p>
            </div>
          </div>
          <div className="flex justify-center mt-12 space-x-6">
            <Link
              to="/recipe-form"
              className="bg-gray-900 text-white py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-105 text-lg font-semibold"
            >
              Explore
            </Link>
            <Link
              to="/saved-recipes"
              className="bg-gray-700 text-white py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transform transition-all hover:scale-105 text-lg font-semibold"
            >
              Saved Recipe
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

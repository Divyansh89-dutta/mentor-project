import { Link } from "react-router-dom";

export default function Navbar({ isAuthenticated, handleLogout }) {
  return (
    <nav className="bg-gray-800 text-white fixed w-full p-4 shadow-lg flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/">🍽️ RecipeApp</Link>
      </div>
      <div className="flex space-x-6">
        {isAuthenticated ? (
          <>
            <Link to="/" className="hover:text-blue-400">
              Home
            </Link>
            <Link to="/recipe-form" className="hover:text-blue-400">
              Explore
            </Link>
            <Link to="/saved-recipes" className="hover:text-blue-400">
              Saved
            </Link>
            <button onClick={handleLogout} className="hover:text-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-400">
              Login
            </Link>
            <Link to="/signup" className="hover:text-green-400">
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

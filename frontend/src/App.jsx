import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import RecipeForm from "./components/RecipeForm";
import SavedRecipes from "./pages/SavedRecipes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecipeDisplay from "./components/RecipeDisplay";
import Recipe from "./pages/Recipe";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated (e.g., token in localStorage)
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-5">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/recipe-form" element={isAuthenticated ? <RecipeForm /> : <Navigate to="/login" />} />
          <Route path="/saved-recipes" element={isAuthenticated ? <SavedRecipes /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipe" element={isAuthenticated ? <Recipe /> : <Navigate to="/login" />} />
          <Route path="/recipes" element={isAuthenticated ? <RecipeDisplay /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

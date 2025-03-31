import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import SavedRecipes from "./pages/SavedRecipes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RecipeDisplay from "./components/RecipeDisplay";
import Recipe from "./pages/Recipe";
import { RecipeForm } from "./components/RecipeForm";
import Navbar from "./pages/Navbar";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />} />
          <Route path="/recipe-form" element={isAuthenticated ? <RecipeForm /> : <Navigate to="/login" replace />} />
          <Route path="/saved-recipes" element={isAuthenticated ? <SavedRecipes /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/recipe" element={isAuthenticated ? <Recipe /> : <Navigate to="/login" replace />} />
          <Route path="/recipes" element={isAuthenticated ? <RecipeDisplay /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

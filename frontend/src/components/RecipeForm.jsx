import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post("http://localhost:5000/api/recipes/generate", {
        ingredients: ingredients.split(",").map((item) => item.trim()),
        cuisine,
        dietaryPreferences,
      });

      if (response.data) {
        navigate("/recipes", { state: { recipe: response.data } });
      } else {
        setError("No recipe data received.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to generate recipe.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6 text-white">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full p-8 bg-gray-800 rounded-xl shadow-lg flex flex-col lg:flex-row items-center"
      >
        <div className="lg:w-1/2 mb-6 lg:mb-0">
        <img className="h-30 w-30 ml-17 mb-3 rounded-2xl" src="https://www.logoai.com/uploads/output/2022/02/07/a0f88591c5c5690724e3fbefe1e490e8.jpg" alt="" />
          <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">Generate a Recipe</h2>
          <p className="text-gray-400 text-sm text-center lg:text-left">Enter ingredients, select cuisine, and choose dietary preferences to get a personalized recipe!</p>
        </div>
        <div className="lg:w-1/2 w-full">
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300">Ingredients</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700 text-white mt-1"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-300">Cuisine Type</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700 text-white mt-1"
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-300">Dietary Preferences</label>
              <input
                type="text"
                className="w-full p-2 border rounded bg-gray-700 text-white mt-1"
                value={dietaryPreferences}
                onChange={(e) => setDietaryPreferences(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gray-700 to-gray-500 text-white py-2 px-4 rounded hover:shadow-lg transform transition-all hover:scale-105"
            >
              Generate Recipe
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

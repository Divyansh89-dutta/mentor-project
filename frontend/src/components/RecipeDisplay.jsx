import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

export default function RecipeDisplay() {
  const location = useLocation();
  const recipe = location.state?.recipe;
  const [message, setMessage] = useState("");

  if (!recipe) {
    return <div className="text-center text-red-500">No recipe found.</div>;
  }

  const handleSaveRecipe = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/recipes/save", recipe);
      setMessage(response.data.message || "Recipe saved successfully!");
    } catch (error) {
      setMessage("Failed to save recipe.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-6 text-white">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full p-8 bg-gray-800 rounded-xl shadow-lg"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">{recipe.title || "Untitled Recipe"}</h2>
        <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
        <ul className="list-disc list-inside mb-4">
          {recipe.ingredients?.map((ingredient, index) => (
            <li key={index}>
              {ingredient.name} - {ingredient.quantity}
            </li>
          ))}
        </ul>
        <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
        <ol className="list-decimal list-inside text-gray-400 space-y-2">
          {recipe.instructions?.map((step, index) => (
            <li key={index}>{step.step}</li>
          ))}
        </ol>
        <p className="mt-4 text-gray-400">
          <strong>Cooking Time:</strong> {recipe.cooking_time}
        </p>
        <p className="text-gray-400">
          <strong>Serving Size:</strong> {recipe.serving_size}
        </p>
        <button
          onClick={handleSaveRecipe}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition transform hover:scale-105"
        >
          Save Recipe
        </button>
        {message && <p className="text-blue-400 mt-2">{message}</p>}
      </motion.div>
    </div>
  );
}

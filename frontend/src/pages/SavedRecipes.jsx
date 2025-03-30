import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await axios.get(
          "http://localhost:5000/api/recipes/saved",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setRecipes(response.data.recipes || []);
      } catch (error) {
        console.error(
          "❌ Error fetching saved recipes:",
          error.response?.data || error.message
        );
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleDeleteRecipe = async (recipeId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      await axios.delete(
        `http://localhost:5000/api/recipes/delete/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (error) {
      console.error(
        "❌ Error deleting recipe:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 to-black p-6 text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mb-6"
      >
        Saved Recipes
      </motion.h1>

      {recipes.length === 0 ? (
        <p className="text-gray-400 text-lg">No saved recipes found.</p>
      ) : (
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg space-y-6"
        >
          {recipes.map((recipe) => (
            <motion.li
              key={recipe._id}
              className="border-b border-gray-600 pb-4 last:border-none"
              whileHover={{ scale: 1.02 }}
            >
              {/* Recipe Title */}
              <h2 className="text-xl font-semibold text-white">
                {recipe.title}
              </h2>

              {/* Cooking Time & Servings */}
              <p className="text-gray-400 mt-1">
                <strong>⏳ Cooking Time:</strong> {recipe.cooking_time || "N/A"}{" "}
                | <strong>🍽️ Servings:</strong> {recipe.serving_size || "N/A"}
              </p>

              {/* Ingredients */}
              {recipe.ingredients && recipe.ingredients.length > 0 && (
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-gray-300">
                    🥦 Ingredients:
                  </h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.item} - {ingredient.quantity}{" "}
                        {ingredient.unit ? ingredient.unit : ""}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Instructions */}
              {recipe.instructions && Array.isArray(recipe.instructions) ? (
                <div className="mt-2">
                  <h3 className="text-lg font-semibold text-gray-300">
                    👨‍🍳 Instructions:
                  </h3>
                  <ol className="list-decimal list-inside text-gray-400 space-y-2">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={instruction._id || index}>
                        <strong>Step {instruction.step}:</strong>{" "}
                        {instruction.text}
                      </li>
                    ))}
                  </ol>
                </div>
              ) : (
                <p className="text-gray-400">No instructions available.</p>
              )}

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition transform hover:scale-105"
              >
                Delete
              </button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}

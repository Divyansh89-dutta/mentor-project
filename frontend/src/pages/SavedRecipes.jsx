import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await axios.get(
          "https://mentor-project.onrender.com/api/recipes/saved",
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
        `${process.env.REACT_APP_API_URL}api/recipes/delete/${recipeId}`,
        // `http://localhost:5000/api/recipes/delete/${recipeId}`,
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
    <div className="min-h-screen flex flex-col items-center bg-gray-900 p-6 text-white">
      <div className="w-full max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-400 hover:underline flex items-center gap-2"
        >
          ← Back
        </button>
      </div>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold mb-6 text-center"
      >
        Saved Recipes
      </motion.h1>

      {recipes.length === 0 ? (
        <p className="text-gray-400 text-lg">No saved recipes found.</p>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 w-full max-w-6xl"
        >
          {recipes.map((recipe) => (
            <motion.div
              key={recipe._id}
              className="bg-gray-800 rounded-xl p-6 shadow-lg "
             
            >
              <h2 className="text-2xl font-semibold text-white mb-4">{recipe.title}</h2>
              <div className="grid grid-cols-2 gap-6">
                {/* Ingredients on the Left */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">🥦 Ingredients:</h3>
                  <ul className="list-disc list-inside text-gray-400 space-y-1">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>
                        {ingredient.item} - {ingredient.quantity} {ingredient.unit || ""}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Instructions on the Right */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-300 mb-2">👨‍🍳 Instructions:</h3>
                  <ol className="list-decimal list-inside text-gray-400 space-y-2">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={instruction._id || index}>
                        <strong>Step {instruction.step}:</strong> {instruction.text}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 duration-300 w-full"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
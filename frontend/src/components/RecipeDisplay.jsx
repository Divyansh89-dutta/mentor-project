import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RecipeDisplay() {
  const location = useLocation();
  const recipe = location.state?.recipe;
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Fetched Recipe Data:", recipe);
  }, [recipe]);

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-red-500 text-2xl font-semibold">
        No recipe found.
      </div>
    );
  }

  const handleSaveRecipe = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in to save recipes.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/recipes/save",
        recipe,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setMessage(response.data.message || "Recipe saved successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to save recipe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="p-6 text-white">
          <h2 className="text-3xl font-bold text-center mb-4">
            {recipe.title || "Delicious Recipe"}
          </h2>

          {/* Cooking Time & Serving Size */}
          <div className="flex justify-center gap-6 text-gray-400 text-lg mb-4">
            <p>
              <strong>⏳ Cooking Time:</strong> {recipe.cooking_time || "N/A"}
            </p>
            <p>
              <strong>🍽️ Servings:</strong> {recipe.serving_size || "N/A"}
            </p>
          </div>

          {/* Ingredients */}
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            🥦 Ingredients:
          </h3>
          <ul className="list-disc list-inside text-gray-400 mb-4 space-y-1">
            {recipe.ingredients?.map((ingredient, index) => (
              <li key={index}>
                {ingredient.item} - {ingredient.quantity}{" "}
                {ingredient.unit ? ingredient.unit : ""}
              </li>
            ))}
          </ul>

          {/* Instructions */}
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            👨‍🍳 Instructions:
          </h3>
          <ol className="list-decimal list-inside text-gray-400 space-y-2">
            {recipe.instructions?.map((instruction, index) => (
              <li key={index}>
                <strong>Step {instruction.step}:</strong> {instruction.text}
              </li>
            ))}
          </ol>

          {/* Save Recipe Button */}
          <button
            onClick={handleSaveRecipe}
            className="mt-6 w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition transform hover:scale-105 flex justify-center items-center"
          >
            {loading ? (
              <span className="animate-spin h-6 w-6 border-b-2 border-white"></span>
            ) : (
              "Save Recipe"
            )}
          </button>

          {/* Message Display */}
          {message && (
            <p
              className={`mt-3 text-center text-lg ${
                message.includes("Failed") ? "text-red-500" : "text-blue-400"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

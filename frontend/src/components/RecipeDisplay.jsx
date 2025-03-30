import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function RecipeDisplay() {
  const location = useLocation();
  const recipe = location.state?.recipe; // Get the recipe data from state
  const [message, setMessage] = useState("");

  if (!recipe) {
    return <div className="text-center text-red-500">No recipe found.</div>;
  }

  const handleSaveRecipe = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/recipes/save", recipe);
      setMessage(response.data.message || "Recipe saved successfully!");
    } catch (error) {
      console.error("Error saving recipe:", error);
      setMessage("Failed to save recipe.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">{recipe.title || "Untitled Recipe"}</h2>

      {/* Ingredients Section */}
      <h3 className="text-xl font-semibold mb-2">Ingredients:</h3>
      <ul className="list-disc list-inside mb-4">
        {recipe.ingredients?.map((ingredient, index) => (
          <li key={index}>
            {ingredient.name} - {ingredient.quantity}
          </li>
        ))}
      </ul>

      {/* Instructions Section */}
      <h3 className="text-xl font-semibold mb-2">Instructions:</h3>
      <ol className="list-decimal list-inside text-gray-700 space-y-2">
        {recipe.instructions?.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))}
      </ol>

      {/* Cooking Time & Serving Size */}
      <p className="mt-4 text-gray-600">
        <strong>Cooking Time:</strong> {recipe.cooking_time}
      </p>
      <p className="text-gray-600">
        <strong>Serving Size:</strong> {recipe.serving_size}
      </p>

      {/* Save Button */}
      <button
        onClick={handleSaveRecipe}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Save Recipe
      </button>

      {message && <p className="text-blue-600 mt-2">{message}</p>}
    </div>
  );
}

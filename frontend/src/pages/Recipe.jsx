import { useState } from "react";
import axios from "axios";

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error before request

    try {
      const response = await axios.post("http://localhost:5000/api/recipes/generate", {
        ingredients: ingredients.split(",").map((item) => item.trim()),
        cuisine,
        dietaryPreferences,
      });

      console.log("Recipe API Response:", response.data); // Debugging

      if (response.data) {
        setRecipe(response.data); // Store recipe in state to display on the same page
      } else {
        setError("No recipe data received.");
      }
    } catch (error) {
      console.error("Error generating recipe:", error);
      setError(error.response?.data?.message || "Failed to generate recipe.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Generate a Recipe</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      {/* Recipe Form */}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Ingredients (comma-separated)</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Cuisine Type</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            value={cuisine}
            onChange={(e) => setCuisine(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Dietary Preferences</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            value={dietaryPreferences}
            onChange={(e) => setDietaryPreferences(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Generate Recipe
        </button>
      </form>

      {/* Display Recipe Data */}
      {recipe && (
  <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
    <h3 className="text-2xl font-bold mb-3">{recipe.title || "Generated Recipe"}</h3>
    
    {/* Cooking Time & Serving Size */}
    <p className="text-gray-700"><strong>Cooking Time:</strong> {recipe.cooking_time || "N/A"}</p>
    <p className="text-gray-700"><strong>Serving Size:</strong> {recipe.serving_size || "N/A"}</p>

    {/* Ingredients */}
    <h4 className="text-lg font-semibold mt-4">Ingredients:</h4>
    <ul className="list-disc list-inside mb-4">
      {recipe.ingredients?.length > 0 ? (
        recipe.ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.unit} {ingredient.item}
          </li>
        ))
      ) : (
        <p>No ingredients available.</p>
      )}
    </ul>

    {/* Instructions */}
    <h4 className="text-lg font-semibold">Instructions:</h4>
    <ol className="list-decimal list-inside text-gray-700 space-y-2">
      {recipe.instructions?.length > 0 ? (
        recipe.instructions.map((step, index) => (
          <li key={index}>{step.step}</li>
        ))
      ) : (
        <p>No instructions provided.</p>
      )}
    </ol>
  </div>
)}

    </div>
  );
}

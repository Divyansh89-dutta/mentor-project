import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
        navigate("/recipes", { state: { recipe: response.data } });
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
    </div>
  );
}

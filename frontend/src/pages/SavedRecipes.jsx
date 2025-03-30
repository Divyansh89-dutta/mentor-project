import { useEffect, useState } from "react";
import axios from "axios";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetchSavedRecipes();
  }, []);

  const fetchSavedRecipes = async () => {
    try {
      const userId = "YOUR_USER_ID"; // Replace with actual user ID (from auth or state)
      const response = await axios.get(`http://localhost:5000/api/recipes/saved/${userId}`);
      setRecipes(response.data.recipes); // Ensure you're accessing `recipes` inside response data
    } catch (error) {
      console.error("❌ Error fetching saved recipes:", error.response?.data || error.message);
    }
};


  const handleDeleteRecipe = async (recipeId) => {
    try {
      await axios.delete(`http://localhost:5000/api/recipes/delete/${recipeId}`);
      setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== recipeId));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Saved Recipes</h1>
      {recipes.length === 0 ? (
        <p className="text-gray-600">No saved recipes found.</p>
      ) : (
        <ul className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
          {recipes.map((recipe) => (
            <li key={recipe._id} className="mb-4 border-b pb-4">
              <h2 className="text-xl font-semibold">{recipe.title}</h2>
              <p className="text-gray-700">{recipe.instructions}</p>

              {/* Delete Button */}
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

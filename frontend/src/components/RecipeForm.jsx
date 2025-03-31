import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

export function RecipeForm() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryPreferences, setDietaryPreferences] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://mentor-project.onrender.com/api/recipes/generate",
         {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-400 hover:underline flex items-center gap-2"
        >
          ← Back
        </button>
      </div>
      <div className="flex lg:h-[60vh] w-full max-w-6xl p-6 bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div
          className="relative rounded-2xl hidden md:block md:w-1/2"
          style={{
            background: `url("https://images.unsplash.com/photo-1659018966820-de07c94e0d01?q=80&w=2098&auto=format&fit=crop") center/cover no-repeat`,
          }}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-6">
            <h2 className="text-black text-4xl font-bold">Get Your Recipe!</h2>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col gap-4 md:w-1/2 p-8"
        >
          <h1 className="text-3xl font-bold text-white text-center">Generate Recipe</h1>
          <p className="text-gray-400 text-center">
            Want to see your saved recipes? <Link to="/saved-recipes" className="text-purple-400">View Saved Recipes</Link>
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <input
              type="text"
              placeholder="Ingredients (comma separated)"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cuisine Type"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
            />
            <input
              type="text"
              placeholder="Dietary Preferences"
              className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={dietaryPreferences}
              onChange={(e) => setDietaryPreferences(e.target.value)}
            />
            <button
              type="submit"
              className="w-full bg-purple-500 text-white p-3 rounded-lg mt-4 flex items-center justify-center transition duration-300 ease-in-out transform hover:bg-purple-600 hover:scale-105"
            >
              {loading ? (
                <span className="animate-spin h-6 w-6 border-b-2 border-white"></span>
              ) : (
                "Generate Recipe"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

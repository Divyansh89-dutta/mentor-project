import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

// RecipeForms Component
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <div className="flex lg:h-[59vh] w-full max-w-4xl p-4 bg-gray-800 rounded-lg shadow-lg overflow-hidden">
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

        <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="w-full flex flex-col gap-2 md:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-white text-center mb-6">Generate Recipe</h1>
          <p className="text-gray-400 text-center mb-4">
            Want to see your saved recipes? <Link to="/saved-recipes" className="text-purple-400">View Saved Recipes</Link>
          </p>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <input type="text" placeholder="Ingredients (comma separated)" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
            <input type="text" placeholder="Cuisine Type" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white" value={cuisine} onChange={(e) => setCuisine(e.target.value)} />
            <input type="text" placeholder="Dietary Preferences" className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-white" value={dietaryPreferences} onChange={(e) => setDietaryPreferences(e.target.value)} />
            <button type="submit" className="w-full bg-purple-500 text-white p-3 rounded-lg mt-4 hover:bg-purple-600 transition flex items-center justify-center">
              {loading ? <span className="animate-spin h-6 w-6 border-b-2 border-white"></span> : "Generate Recipe"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

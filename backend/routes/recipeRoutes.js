const express = require("express");
const router = express.Router();
const {
  generateRecipe,
  saveRecipe,
  getSavedRecipes,
  deleteRecipe
} = require("../controllers/recipeController");

// Recipe routes
router.post("/generate", generateRecipe); // Generate recipe with AI
router.post("/save", saveRecipe); // Save recipe to database
router.get("/saved/:userId", getSavedRecipes); // Get all saved recipes for a user
router.delete("/delete/:recipeId", deleteRecipe); // Delete a specific recipe

// ✅ Ensure correct export
module.exports = router;

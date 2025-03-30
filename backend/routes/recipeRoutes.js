const express = require("express");
const router = express.Router();
const {
    generateRecipe,
    saveRecipe,
    getSavedRecipes,
    deleteRecipe,
    authenticateUser
} = require("../controllers/recipeController");

// ✅ Routes
router.post("/generate", generateRecipe); // AI Recipe Generation
router.post("/save", authenticateUser, saveRecipe); // Save Recipe (Requires Auth)
router.get("/saved", authenticateUser, getSavedRecipes); // Get User Recipes
router.delete("/delete/:recipeId", authenticateUser, deleteRecipe); // Delete Recipe
// ✅ Export Routes
module.exports = router;

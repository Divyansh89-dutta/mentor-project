const { signup, login } = require("./authController");
const {
  generateRecipe,
  saveRecipe,
  getSavedRecipes,
  deleteRecipe,
} = require("./recipeController");

module.exports = {
  signup,
  login,
  generateRecipe,
  saveRecipe,
  getSavedRecipes,
  deleteRecipe,
};

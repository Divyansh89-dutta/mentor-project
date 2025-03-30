const express = require("express");
const authRoutes = require("./authRoutes");
const recipeRoutes = require("./recipeRoutes");

const router = express.Router();

router.use("/api/auth", authRoutes);
router.use("/api/recipes", recipeRoutes);

module.exports = router;

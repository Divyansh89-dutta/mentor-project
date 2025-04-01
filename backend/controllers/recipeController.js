const axios = require("axios");
const jwt = require("jsonwebtoken");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Recipe = require("../models/Recipe");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generatePrompt = (ingredients, cuisine = "", dietaryPreferences = "") => {
    let prompt = `Create a unique recipe using the following ingredients: ${ingredients.join(", ")}.`;
    if (cuisine) prompt += ` Cuisine: ${cuisine}.`;
    if (dietaryPreferences) prompt += ` Dietary preferences: ${dietaryPreferences}.`;
    prompt += " Include clear steps, cooking time, and serving size. Format response as a **valid JSON object** with keys: 'title', 'ingredients', 'instructions'.";
    return prompt;
};

const generateRecipe = async (req, res) => {
    const { ingredients, cuisine, dietaryPreferences } = req.body;

    if (!ingredients || ingredients.length === 0) {
        return res.status(400).json({ message: "Ingredients are required." });
    }

    const prompt = generatePrompt(ingredients, cuisine, dietaryPreferences);
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });

        if (!result?.response?.candidates || result.response.candidates.length === 0) {
            throw new Error("Invalid response from Gemini API");
        }

        const responseText = result.response.candidates[0]?.content?.parts?.[0]?.text || "";
        if (!responseText) throw new Error("Empty response from Gemini API");

        let recipe;
        try {
            recipe = JSON.parse(responseText.replace(/```json|```/g, "").trim());
        } catch (error) {
            throw new Error("Failed to parse AI response. Invalid JSON format.");
        }

        res.status(200).json(recipe);
    } catch (error) {
        console.error("Gemini API request failed:", error);
        res.status(500).json({ message: "Failed to generate recipe", error: error.message });
    }
};
const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; 
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};

const saveRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, cuisine, dietaryPreferences } = req.body;

        if (!title || !ingredients || !instructions) {
            return res.status(400).json({ message: "Title, ingredients, and instructions are required" });
        }

        const newRecipe = new Recipe({
            title,
            ingredients,
            instructions,
            cuisine,
            dietaryPreferences,
            userId: req.userId,
        });

        await newRecipe.save();
        res.status(201).json({ message: "Recipe saved successfully", recipe: newRecipe });
    } catch (error) {
        console.error("Error saving recipe:", error);
        res.status(500).json({ message: "Failed to save recipe", error: error.message });
    }
};

const getSavedRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find({ userId: req.userId });

        res.status(200).json({ recipes });
    } catch (error) {
        console.error("Error fetching recipes:", error);
        res.status(500).json({ message: "Failed to fetch recipes" });
    }
};

const deleteRecipe = async (req, res) => {
    try {
        const { recipeId } = req.params;

        if (!recipeId) {
            return res.status(400).json({ message: "Recipe ID is required" });
        }

        const deletedRecipe = await Recipe.findOneAndDelete({ _id: recipeId, userId: req.userId });

        if (!deletedRecipe) {
            return res.status(401).json({ message: "Recipe not found or unauthorized" });
        }

        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.error("Error deleting recipe:", error);
        res.status(500).json({ message: "Failed to delete recipe" });
    }
};

module.exports = {
    generateRecipe,
    saveRecipe,
    getSavedRecipes,
    deleteRecipe,
    authenticateUser, 
};

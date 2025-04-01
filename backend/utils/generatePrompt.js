const { GoogleGenerativeAI } = require("@google/generative-ai"); 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateRecipe = async (ingredients, preferences, cuisine) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Generate a recipe using: ${ingredients}. Preferences: ${preferences}. Cuisine: ${cuisine}. Format response as a **valid JSON object** with keys: "title", "ingredients", "instructions".`;

  try {
    const result = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });

    if (!result?.response?.candidates || result.response.candidates.length === 0) {
      throw new Error("Invalid response from Gemini API");
    }

    const responseText = result.response.candidates[0]?.content?.parts?.[0]?.text || "";

    if (!responseText) {
      throw new Error("Empty response from Gemini API");
    }

    const cleanedResponse = responseText.replace(/```json|```/g, "").trim();

    return JSON.parse(cleanedResponse);
  } catch (error) {
    console.error("Gemini API request failed:", error);
    throw new Error("Gemini API request failed");
  }
};

module.exports = generateRecipe;


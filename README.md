# Recipe Generator

## 📌 Overview
This project is a **Recipe Generator** that allows users to input ingredients, cuisine type, and dietary preferences to generate unique recipes using **Google's Gemini AI**. Users can also save their generated recipes to a **MongoDB** database.

## 🛠️ Features
- ✅ Generate unique recipes using **Google Gemini AI**
- ✅ Save recipes to **MongoDB** for future reference
- ✅ Fetch saved recipes for a specific user
- ✅ Delete saved recipes

## 🚀 Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (using Mongoose)
- **AI Model:** Google Gemini API

## ⚙️ Installation

### 1️⃣ Clone the Repository
```sh
git clone https://github.com/your-username/recipe-generator.git
cd recipe-generator
```

### 2️⃣ Install Dependencies
#### Backend
```sh
cd server
npm install
```

#### Frontend
```sh
cd client
npm install
```

### 3️⃣ Set Up Environment Variables
Create a `.env` file in the `server` directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
```

### 4️⃣ Run the Application
#### Start the Backend
```sh
cd server
npm start
```

#### Start the Frontend
```sh
cd client
npm start
```

## 📡 API Endpoints

### 📝 Generate Recipe
**POST** `/api/recipes/generate`
#### Request Body:
```json
{
  "ingredients": ["chicken", "garlic", "onion"],
  "cuisine": "Italian",
  "dietaryPreferences": "Gluten-Free",
  "userId": "12345"
}
```
#### Response:
```json
{
  "message": "Recipe generated and saved successfully",
  "recipe": { "title": "Chicken Piccata", "ingredients": [...], "instructions": [...] }
}
```

### 📥 Save Recipe
**POST** `/api/recipes/save`
#### Request Body:
```json
{
  "title": "Chicken Piccata",
  "ingredients": [...],
  "instructions": [...],
  "userId": "12345"
}
```

### 📜 Get Saved Recipes
**GET** `/api/recipes/user/:userId`

### ❌ Delete Recipe
**DELETE** `/api/recipes/:recipeId`

## 📌 Contributing
1. Fork the repository 🍴
2. Create a new branch 📂
3. Commit your changes ✅
4. Push to your branch 🚀
5. Submit a pull request 📢

## 📜 License
This project is licensed under the **MIT License**.


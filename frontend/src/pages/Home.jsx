import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Recipe Generator</h1>
      <p className="text-lg text-gray-600 mb-8">Create and save unique recipes based on your ingredients.</p>
      <div className="flex space-x-4">
        <Link
          to="/recipe-form"
          className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
        >
          Generate Recipe
        </Link>
        <Link
          to="/saved-recipes"
          className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600"
        >
          View Saved Recipes
        </Link>
      </div>
    </div>
  );
}
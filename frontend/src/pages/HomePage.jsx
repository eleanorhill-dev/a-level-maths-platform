import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-white text-gray-800 p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to MathsUncoded 🧠</h1>
      <p className="text-lg mb-8 text-center max-w-md">
        Build your skills, track your progress, and master A-Level Maths — one concept at a time.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
          onClick={() => navigate("/topics")}
        >
          Go to Topics
        </button>

        <button
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
          onClick={() => navigate("/profile")}
        >
          View Profile
        </button>

      </div>

      <blockquote className="mt-10 italic text-gray-600 max-w-xl text-center">
        “Pure mathematics is, in its way, the poetry of logical ideas.” — Albert Einstein
      </blockquote>
    </div>
  );
};

export default HomePage;

import React from "react";
import { useNavigate } from "react-router-dom";
import NotFoundImage from "../assets/NotFound.png"; // Add a relevant 404 illustration or icon here

const PageNotFound = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1); // Navigate to the previous page
  const goHome = () => navigate("/"); // Navigate to the home page

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#4EB4F8] via-[#D8E9FF] to-white flex flex-col items-center justify-center px-4">
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="w-1/2 max-w-md mb-6"
      />
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-700 text-center mb-8">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <button
          onClick={goBack}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-6 rounded-lg"
        >
          Go Back
        </button>
        <button
          onClick={goHome}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;

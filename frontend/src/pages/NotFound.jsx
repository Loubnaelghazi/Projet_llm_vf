import React from "react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-600">
      <div className="max-w-lg p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-lg text-gray-800 mb-8">Oops! Page not found</p>
        <img
          src="https://cdn.pixabay.com/photo/2016/01/20/13/05/error-1157790_1280.jpg"
          alt="404 Illustration"
          className="w-80 rounded-lg shadow-md mb-8 mx-auto"
        />
        <a href="/" className="btn btn-primary">
          Go back to Home
        </a>
      </div>
    </div>
  );
}

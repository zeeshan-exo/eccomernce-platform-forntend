import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="p-10 bg-white shadow-xl rounded-xl text-center space-y-8 w-full max-w-lg">
        <h1 className="text-8xl font-bold text-red-600 ">404</h1>
        <h3 className="text-3xl font-medium text-gray-700">
          Oops! Page Not Found
        </h3>
        <p className="text-lg text-gray-500">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <Link to={"/admin/dashboard"}>
          <button className="bg-gradient-to-r from-teal-600 to-teal-700 hover:bg-teal-800 text-white mt-6 font-semibold text-lg px-8 py-4 rounded-full shadow-lg transition duration-300 transform hover:scale-110 hover:shadow-2xl">
            Go Back to Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
}

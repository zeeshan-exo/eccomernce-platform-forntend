import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSignupMutation, setUser } from "../features/auth/AuthSlice";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading, isSuccess, error, data }] = useSignupMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name,
        email,
        password,
      };
      const response = await signup(data);
      if (!response.data) {
        throw new Error("Failed to signup");
      }
      dispatch(setUser(response.data));
      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl border border-gray-200"
      >
        <h2 className="text-3xl font-semibold text-teal-700 text-center mb-8">
          Sign Up
        </h2>

        <div className="mb-6">
          <label
            htmlFor="name"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            id="name"
            className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            id="email"
            className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Password
          </label>
          <input
            id="password"
            className="w-full p-4 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="w-full py-3 bg-teal-600 text-white text-lg font-semibold rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>

        {error && (
          <div className="mt-4 text-red-600 text-center text-sm">
            <p>{error.message}</p>
          </div>
        )}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-teal-600 font-semibold hover:text-teal-700"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;

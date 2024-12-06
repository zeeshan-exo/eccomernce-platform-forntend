import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation, setUser } from "../features/auth/AuthSlice";

function Login() {
  const [email, setEmail] = useState("zeeshan2@gmail.com");
  const [password, setPassword] = useState("12345678");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess, error, data }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email,
        password,
      };
      const response = await login(data).unwrap();
      if (!response.data) {
        throw new Error("Failed to login");
      }
      console.log(response.data);
      dispatch(setUser(response.data.data));
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
          Login
        </h2>

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
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {error && (
          <div className="mt-4 text-red-600 text-center text-sm">
            <p>{error.message}</p>
          </div>
        )}

        <p className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            className="text-teal-600 hover:text-teal-700 font-semibold"
            to="/"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

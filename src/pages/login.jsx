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
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="form-container p-6 border rounded-lg shadow-lg bg-white"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="text-center text-2xl font-semibold mb-6 text-gray-700">
          Login
        </h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            className="form-control w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            className="form-control w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          className="btn w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="submit"
        >
          Login
        </button>

        <p className="mt-4">
          Don't have an Account ?{" "}
          <Link
            className="text-blue-600 underline hover:text-blue-800 "
            to={"/"}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;

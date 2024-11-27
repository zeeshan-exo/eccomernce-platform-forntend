import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import "../styles/signup.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const naviagte = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", { email, password });

    const response = await fetch("http://localhost:3001/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();

    console.log("User logged in successfully:", data);

    naviagte("/product");
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
      </form>
    </div>
  );
}

export default Login;

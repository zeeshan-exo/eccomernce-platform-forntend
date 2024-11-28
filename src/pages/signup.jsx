import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

function Signup() {
  const navigate = useNavigate("");
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted:", { name, email, password });

    const response = await fetch("http://localhost:3001/api/user/signup", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    const data = await response.json();

    console.log("User signed up successfully:", data);

    navigate("/dashboard");
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="form-container space-y-4">
          <h2 className="text-3xl font-semibold text-center text-gray-700 ">
            Signup
          </h2>

          <input
            className="input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            className="input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="input-field w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="Submit-btn w-full h-10 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;

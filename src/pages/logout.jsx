import React, { useState } from "react";

function Logout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState();

  const handleSubmit = async (e) => {
    e.preventdefault();

    console.log("Logged Out successfully", { email, password });

    const response = await fetch("http://localhost:3001/api/user/logout", {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    console.log("User logged in successfully:", data);
  };

  return (
    <div className="container mx-auto flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="form-container p-6 border rounded-lg shadow-lg bg-white"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        {/* <h2 className="text-center text-2xl font-semibold mb-6 text-gray-700">
          
        </h2> */}

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
          Logout
        </button>
      </form>
    </div>
  );
}

export default Logout;

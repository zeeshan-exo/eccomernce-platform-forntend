import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth";

function Logout() {
  const { logout } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/user/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to logout");
      }

      logout();
      console.log("Logged out");
      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
      setError("Invalid credentials or logout failed");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className=" mt-16 p-2 rounded-md text-lg border-solid bg-red-500 hover:bg-red-600 transition duration-200"
    >
      Logout
    </button>
  );
}

export default Logout;

{
  /* <div className="container mx-auto flex justify-center items-center min-h-screen">
<div className="text-center">
  <h2 className="text-xl font-semibold text-gray-700 mb-4">
    Please verify your credentials to log out
  </h2>

  {error && <p className="text-red-500">{error}</p>}

  <form onSubmit={handleLogout}>
    <div className="mb-4">
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
      type="submit"
      className="btn font-bold w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      Logout
    </button>
  </form>
</div>
</div> */
}

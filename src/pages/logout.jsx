import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation, setUser } from "../features/auth/AuthSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logout, { isLoading, isSuccess, error, data }] = useLogoutMutation();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const response = await logout(data).unwrap();
      if (response.data) {
        throw new Error("Failed to logout");
      }
      dispatch(setUser(null));
      navigate("/login");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-60 p-3 w-48 text-white text-lg font-semibold rounded-lg border border-transparent bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 transition duration-300 transform hover:scale-105"
    >
      Logout
    </button>
  );
}

export default Logout;

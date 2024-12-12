import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation, setUser } from "../features/auth/AuthSlice";
import { MdLogout } from "react-icons/md";

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
      className="mt-60 flex-1 p-2 w-48 text-white text-lg font-semibold "
    >
      <span className="flex-1 text-2xl hover:text-red-600">
        <MdLogout />
      </span>
    </button>
  );
}

export default Logout;

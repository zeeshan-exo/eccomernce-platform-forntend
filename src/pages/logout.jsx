import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation, setUser } from "../features/auth/AuthSlice";

function Logout() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      className=" mt-16 p-2 rounded-md text-lg border-solid bg-red-500 hover:bg-red-600 transition duration-200"
    >
      Logout
    </button>
  );
}

export default Logout;

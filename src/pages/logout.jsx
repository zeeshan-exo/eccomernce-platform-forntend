import React from "react";
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
      navigate("/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={handleLogout}>
      <MdLogout className=" p-2  font-semibold flex-1 text-4xl hover:text-red-600" />
    </button>
  );
}

export default Logout;

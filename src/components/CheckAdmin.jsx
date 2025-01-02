import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

const AdminCheck = () => {
  const navigate = useNavigate();
  const { authorize } = useAuth();

  useEffect(() => {
    const user = authorize();
    if (user && user.role === "admin") {
      const confirmAdmin = window.confirm(
        "You are an admin. Do you want to go to the login page?"
      );
      if (confirmAdmin) {
        navigate("/login");
      }
    } else {
      alert("You are not an admin. Redirecting to the main page.");
      navigate("/");
    }
  }, [authorize, navigate]);

  return null;
};

export default AdminCheck;

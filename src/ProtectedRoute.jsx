import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;

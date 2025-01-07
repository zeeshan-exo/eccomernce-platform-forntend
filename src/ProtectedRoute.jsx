import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth";

function ProtectedRoute() {
  const { authorize } = useAuth();
  let data = authorize();
  return data?.token && data.data.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
}

export default ProtectedRoute;

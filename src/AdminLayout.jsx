import React from "react";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-indigo-700 text-white">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

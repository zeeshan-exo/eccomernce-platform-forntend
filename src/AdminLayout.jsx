import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <div className="w-65 ">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

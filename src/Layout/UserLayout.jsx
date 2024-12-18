import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function UserLayout() {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-auto bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
// import Footer from "../components/Footer";

export default function AdminLayout() {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-auto bg-gray-100">
          <Outlet />
          {/* <footer className="bg-teal-600 text-white py-4 text-center">
            <Footer />
          </footer> */}
        </div>
      </div>
    </div>
  );
}

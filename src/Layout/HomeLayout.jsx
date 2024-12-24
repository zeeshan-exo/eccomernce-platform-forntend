import React from "react";
import { Outlet } from "react-router-dom";
import HeaderHome from "../components/HomeHeader";
import Footer from "../components/Footer";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-black">
        <HeaderHome />
      </header>

      <main className="flex-1 overflow-auto bg-gray-100 p-4">
        <Outlet />
      </main>

      <footer className="bg-green-900 text-white text-center py-4">
        <Footer />
      </footer>
    </div>
  );
}

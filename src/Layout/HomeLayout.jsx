import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-black">
        <Header
          title={<span className="text-green-800 ">ElectroHub</span>}
          actions={[
            <Link
              to="/home/items"
              key="home"
              className="hover:text-teal-300  transition-colors"
            >
              Products
            </Link>,
            <Link
              to="/home/categories"
              key="features"
              className="hover:text-teal-300  transition-colors"
            >
              Categories
            </Link>,
            <Link
              to="/home/cart"
              key="about"
              className="hover:text-teal-300  transition-colors"
            >
              Cart
            </Link>,
            <Link
              to="/login"
              key="login"
              className=" hover:text-teal-300 px-4 py-2 transition-colors"
            >
              Login
            </Link>,
            <Link
              to="/signup"
              key="signup"
              className="text-white  bg-green-800 rounded-full px-2 py-2 transition-colors"
            >
              Sign Up
            </Link>,
          ]}
          className="bg-gradient-to-b shadow-md"
        />
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

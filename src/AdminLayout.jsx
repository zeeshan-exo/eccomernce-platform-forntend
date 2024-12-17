import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import { Link } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <div className="flex h-screen">
        <Sidebar />

        <div className="flex-1 overflow-auto bg-gray-100">
          {/* <Header
            title="ElectroHub"
            actions={[
              <Link
                to="/"
                key="home"
                className="hover:text-teal-300 text-white transition-colors"
              >
                Home
              </Link>,

              <a
                href="#about"
                key="about"
                className="hover:text-teal-300 text-white transition-colors"
              >
                About
              </a>,
              <a
                href="#contact"
                key="contact"
                className="hover:text-teal-300 text-white transition-colors"
              >
                Contact
              </a>,
            ]}
            className="bg-teal-500"
          /> */}

          <Outlet />
        </div>
      </div>
    </div>
  );
}

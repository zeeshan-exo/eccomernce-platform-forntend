import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logout from "../pages/logout";

function Sidebar() {
  return (
    <aside className="w-64 bg-indigo-800 text-white h-screen p-6 flex flex-col">
      <h2 className="text-3xl font-bold mb-8">Admin Panel</h2>
      <ul className="space-y-6">
        <li>
          <Link
            to="/admin/dashboard"
            className="text-lg hover:text-indigo-300 transition duration-200"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/admin/product"
            className="text-lg hover:text-indigo-300 transition duration-200"
          >
            Products
          </Link>
        </li>

        <li>
          <Link
            to="/admin/customer"
            className="text-lg hover:text-indigo-300 transition duration-200"
          >
            Customer
          </Link>
        </li>
        <li>
          <Link
            to="/admin/order"
            className="text-lg hover:text-indigo-300 transition duration-200"
          >
            Order
          </Link>
        </li>
      </ul>
      <Logout />
    </aside>
  );
}

export default Sidebar;

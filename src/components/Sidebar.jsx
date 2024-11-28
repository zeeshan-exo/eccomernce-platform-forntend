import React from "react";

function Sidebar() {
  return (
    <aside className="w-64 bg-indigo-800 text-white h-screen p-6 flex flex-col">
      <h2 className="text-3xl font-bold mb-8">Shop</h2>
      <ul className="space-y-6">
        <li>
          <a
            href="/product"
            className="text-lg hover:text-indigo-300 transition duration-200"
          >
            Products
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-lg hover:text-indigo-300 transition duration-200"
          >
            Categories
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-lg hover:text-indigo-300 transition duration-200"
          >
            Customers
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-lg hover:text-indigo-300 transition duration-200"
          >
            Inventory
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-lg hover:text-indigo-300 transition duration-200"
          >
            Reports
          </a>
        </li>
        <li>
          <a
            href="#"
            className="text-lg hover:text-indigo-300 transition duration-200"
          >
            Settings
          </a>
        </li>
      </ul>
      <button className=" mt-16 text-lg bg-indigo-800 hover:text-indigo-300 transition duration-200">
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;

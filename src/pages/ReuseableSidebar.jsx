import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ menuItems, className = "" }) {
  const location = useLocation();

  return (
    <div
      className={`w-64 min-h-screen bg-gray-800 text-white p-4 space-y-4 ${className}`}
    >
      <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
        ElectroHub
      </h2>

      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded-lg hover:bg-green-600 transition ${
                location.pathname === item.path ? "bg-green-600" : ""
              }`}
            >
              {/* {item.icon && <span className="mr-3">{item.icon}</span>} */}
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

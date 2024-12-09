import React, { useState } from "react";
import { Sidebar as ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { FaCartShopping, FaBars } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import Logout from "../pages/logout";
// import "react-pro-sidebar/dist/css/styles.css"; // Make sure this CSS is imported

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false); // For small screens

  return (
    <div
      className={`transition-all duration-300 ${collapsed ? "w-20" : "w-64"}`}
    >
      {/* Sidebar */}
      <ProSidebar
        collapsed={collapsed}
        toggled={toggled}
        onToggle={() => setToggled(!toggled)}
        breakPoint="md"
        width="256px"
        collapsedWidth="64px"
        className="h-screen bg-teal-800 text-white overflow-hidden"
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 bg-teal-900">
          <h2 className="text-xl font-bold flex items-center">
            {!collapsed && (
              <span className="flex items-center">
                <FaCartShopping className="mr-2" />
                Admin
              </span>
            )}
          </h2>
          {/* Collapse Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white hover:text-gray-300"
          >
            <FaBars />
          </button>
        </div>

        {/* Menu Items */}
        <Menu className="text-white bg-teal-900">
          <MenuItem
            component={<Link to="/admin/dashboard" />}
            className="hover:bg-teal-800 rounded-lg transition-all"
          >
            <div className="flex items-center">
              <RxDashboard className="mr-2" />
              {!collapsed && "Dashboard"}
            </div>
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/product" />}
            className="hover:bg-slate-950 rounded-lg transition-all"
          >
            {!collapsed && "Products"}
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/customer" />}
            className="hover:bg-teal-700 rounded-lg transition-all"
          >
            {!collapsed && "Customer"}
          </MenuItem>
          <MenuItem
            component={<Link to="/admin/order" />}
            className="hover:bg-teal-700 rounded-lg transition-all"
          >
            {!collapsed && "Orders"}
          </MenuItem>
        </Menu>

        {/* Footer */}
        <div className="mt-auto p-4 bg-teal-900">
          <Logout />
        </div>
      </ProSidebar>

      {/* Toggler for Mobile Screens */}
      <button
        onClick={() => setToggled(!toggled)}
        className="fixed top-4 left-4 lg:hidden z-50 bg-teal-800 text-white p-2 rounded-md"
      >
        <FaBars />
      </button>
    </div>
  );
}

export default Sidebar;

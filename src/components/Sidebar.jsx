import React, { useState } from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { FaCartShopping, FaBars,FaChevronRight,FaChevronLeft } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import Logout from "../pages/logout";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex">
      <ProSidebar
        collapsed={collapsed}
        breakPoint="lg"
        width="250px"
        collapsedWidth="80px"
        className="h-screen"
      >
        <div className="p-6 bg-teal-700">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-white flex items-center">
              <FaCartShopping className="mr-2" />
              {!collapsed && "Admin"}
            </h2>

            <button
              className="lg:hidden text-white"
              onClick={handleToggleSidebar}
            >
              {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>

      
          <Menu className="font-medium pb-4">
            <MenuItem
              component={<Link to="/admin/dashboard" />}
              className="text-white hover:bg-teal-900 hover:text-teal-300 transition duration-200"
            >
              <div className="flex items-center">
              <RxDashboard className="mr-2" />
              {!collapsed && "Dashboard"}
              </div>
            </MenuItem>
            <MenuItem
              component={<Link to="/admin/product" />}
              className="text-white hover:bg-teal-900 hover:text-teal-300 transition duration-200"
            >
           
            Products
            </MenuItem>
            <MenuItem
              component={<Link to="/admin/customer" />}
              className="text-white hover:bg-teal-900 hover:text-teal-300 transition duration-200"
            >
             Customer
            </MenuItem>
            <MenuItem
              component={<Link to="/admin/order" />}
              className="text-white hover:bg-teal-900 hover:text-teal-300 transition duration-200"
            >
             Order
            </MenuItem>
          </Menu>

          <div className="mt-auto">
            <Logout />
          </div>
        </div>
      </ProSidebar>

      <div className="flex-1 p-6"></div>
    </div>
  );
}

export default Sidebar;

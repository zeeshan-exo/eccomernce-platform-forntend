import React, { useState } from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Logout from "../pages/logout";
import { FaBars, FaUser } from "react-icons/fa6";
import { GiShoppingBag } from "react-icons/gi";
import { BsCartFill } from "react-icons/bs";
import { AiFillDashboard } from "react-icons/ai";
import { IoMdOptions } from "react-icons/io";
import { IoHome } from "react-icons/io5";

import { MdOutlineAdminPanelSettings } from "react-icons/md";

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <ProSidebar
      collapsed={collapsed}
      toggled={toggled}
      onToggle={() => setToggled(!toggled)}
      breakPoint="md"
      width="256px"
      collapsedWidth="64px"
      backgroundColor="purple"
    >
      <div
        className="flex items-center justify-between p-4"
        style={{ color: "black", backgroundColor: "purple" }}
      >
        <h2 className="text-xl font-bold flex items-center">
          {!collapsed && (
            <span className="flex items-center">
              <MdOutlineAdminPanelSettings className="mr-2 text-2xl" />
              Admin
            </span>
          )}
        </h2>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-black hover:text-gray-300"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      <Menu style={{ color: "black", backgroundColor: "purple" }}>
        <MenuItem>
          <div>
            <Link to="/admin/dashboard">
              <div className="flex items-center">
                <AiFillDashboard className="mr-2 text-xl" />
                {!collapsed && "Dashboard"}
              </div>
            </Link>
          </div>
        </MenuItem>

        <MenuItem>
          <div>
            <Link to="/">
              <div className="flex items-center">
                <IoHome className="mr-2 text-xl" />
                {!collapsed && "Home"}
              </div>
            </Link>
          </div>
        </MenuItem>

        <MenuItem>
          <div>
            <Link to="/admin/product">
              <div className="flex items-center">
                <GiShoppingBag className="mr-2 text-xl" />
                {!collapsed && "Products"}
              </div>
            </Link>
          </div>
        </MenuItem>

        <MenuItem>
          <div>
            <Link to="/admin/user">
              <div className="flex items-center">
                <FaUser className="mr-2 text-xl" />
                {!collapsed && "User"}
              </div>
            </Link>
          </div>
        </MenuItem>

        <MenuItem>
          <div>
            <Link to="/admin/order">
              <div className="flex items-center">
                <BsCartFill className="mr-2 text-xl" />
                {!collapsed && "Orders"}
              </div>
            </Link>
          </div>
        </MenuItem>

        <SubMenu
        // title={
        //   <div className="flex items-center">
        //     {!collapsed && <span className="mr-2">Categories</span>}
        //     <IoMdOptions />
        //   </div>
        // }
        >
          <MenuItem>
            <div>
              <Link
                to="/admin/category"
                className="block w-full px-3 py-2 transition-colors duration-300"
                style={{ backgroundColor: "purple", color: "white" }}
              >
                {!collapsed && <span>Category</span>}
              </Link>
            </div>
          </MenuItem>
          <MenuItem>
            <div>
              <Link
                to="/admin/subcategory"
                className="block w-full px-3 py-2  transition-colors duration-300"
                style={{ backgroundColor: "purple", color: "white" }}
              >
                {!collapsed && <span>Subcategory</span>}
              </Link>
            </div>
          </MenuItem>
        </SubMenu>
      </Menu>
      <div className="mt-60 text-white px-4 ">
        <Logout />
      </div>

      <button
        onClick={() => setToggled(!toggled)}
        className="fixed top-4 text-2xl left-4 lg:hidden z-50 bg-teal-600 text-white p-2 rounded-md"
      >
        <FaBars />
      </button>
    </ProSidebar>
  );
}

export default Sidebar;

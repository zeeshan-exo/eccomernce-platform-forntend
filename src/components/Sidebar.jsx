import React, { useState } from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Logout from "../pages/logout";
import { FaCartShopping, FaBars, FaBoxOpen, FaPerson } from "react-icons/fa6";
import { FaShoppingBag } from "react-icons/fa";
import { IoMdOptions } from "react-icons/io";
import { RiDashboardFill } from "react-icons/ri";

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
      style={{ backgroundColor: "teal" }}
    >
      <div
        className="flex items-center justify-between p-4 "
        style={{ color: "white", backgroundColor: "teal" }}
      >
        <h2 className="text-xl font-bold flex items-center">
          {!collapsed && (
            <span className="flex items-center">
              <FaCartShopping className="mr-2 text-2xl" />
              Admin
            </span>
          )}
        </h2>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-gray-300"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      <Menu className="text-white bg-teal-900">
        <MenuItem
          component={
            <Link to="/admin/dashboard" style={{ backgroundColor: "teal" }} />
          }
        >
          <div className="flex items-center">
            <RiDashboardFill className="mr-2 text-xl" />
            {!collapsed && "Dashboard"}
          </div>
        </MenuItem>

        <MenuItem
          component={
            <Link to="/admin/product" style={{ backgroundColor: "teal" }} />
          }
        >
          <div className="flex items-center">
            <FaBoxOpen className="mr-2 text-xl" />
            {!collapsed && "Products"}
          </div>
        </MenuItem>

        <MenuItem
          component={
            <Link to="/admin/customer" style={{ backgroundColor: "teal" }} />
          }
        >
          <div className="flex items-center">
            <FaPerson className="mr-2 text-xl" />
            {!collapsed && "Customer"}
          </div>
        </MenuItem>

        <MenuItem
          component={
            <Link to="/admin/order" style={{ backgroundColor: "teal" }} />
          }
        >
          <div className="flex items-center">
            <FaShoppingBag className="mr-2 text-xl" />
            {!collapsed && "Orders"}
          </div>
        </MenuItem>

        <SubMenu
          title={
            <div
              className="flex items-center"
              style={{ backgroundColor: "teal" }}
            >
              <IoMdOptions className="mr-2 " />
              {!collapsed && <span>Categories</span>}
            </div>
          }
          className={` rounded-lg transition-all ${
            collapsed ? "justify-center" : "p-2"
          }`}
        >
          <MenuItem
            component={
              <Link to="/admin/category" style={{ backgroundColor: "teal" }} />
            }
          >
            {!collapsed && <span>Category</span>}
          </MenuItem>

          <MenuItem
            component={
              <Link
                to="/admin/subcategory"
                style={{ backgroundColor: "teal" }}
              />
            }
          >
            {!collapsed && <span>Subcategory</span>}
          </MenuItem>
        </SubMenu>
      </Menu>

      <div className="mt-auto p-4 " style={{ backgroundColor: "teal" }}>
        <Logout />
      </div>
      <button
        onClick={() => setToggled(!toggled)}
        className="fixed top-4 text-2xl left-4 lg:hidden z-50 bg-teal-800 text-white p-2 rounded-md"
      >
        <FaBars />
      </button>
    </ProSidebar>
  );
}

export default Sidebar;

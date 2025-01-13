import React, { useState } from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import Logout from "../pages/logout";
import { FaBars } from "react-icons/fa6";
import MenuIcon from "@mui/icons-material/Menu";
import { AiFillDashboard } from "react-icons/ai";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonIcon from "@mui/icons-material/Person";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";

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
              <AdminPanelSettingsIcon className="mr-2 text-2xl" />
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
                <HomeIcon className="mr-2 text-xl" />
                {!collapsed && "Home"}
              </div>
            </Link>
          </div>
        </MenuItem>

        <MenuItem>
          <div>
            <Link to="/admin/product">
              <div className="flex items-center">
                <LocalMallIcon className="mr-2 text-xl" />
                {!collapsed && "Products"}
              </div>
            </Link>
          </div>
        </MenuItem>

        <MenuItem>
          <div>
            <Link to="/admin/user">
              <div className="flex items-center">
                <PersonIcon className="mr-2 text-xl" />
                {!collapsed && "User"}
              </div>
            </Link>
          </div>
        </MenuItem>

        <MenuItem>
          <div>
            <Link to="/admin/order">
              <div className="flex items-center">
                <ShoppingCartIcon className="mr-2 text-xl" />
                {!collapsed && "Orders"}
              </div>
            </Link>
          </div>
        </MenuItem>

        <SubMenu>
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
                style={{ backgroundColor: "gray", color: "white" }}
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
        <MenuIcon />
      </button>
    </ProSidebar>
  );
}

export default Sidebar;

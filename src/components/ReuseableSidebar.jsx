import React, { useState } from "react";
import {
  Sidebar as ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
// import { IoMdOptions } from "react-icons/io";
import PropTypes from "prop-types";

const Sidebar = ({ menuItems, isAdmin, onLogout }) => {
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
        className="flex items-center justify-between p-4"
        style={{ color: "white", backgroundColor: "teal" }}
      >
        <h2 className="text-xl font-bold flex items-center">
          {!collapsed && <span>Admin Panel</span>}
        </h2>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:text-gray-300"
        >
          <FaBars className="text-xl" />
        </button>
      </div>

      <Menu style={{ color: "white", backgroundColor: "teal" }}>
        {menuItems.map((item) => (
          item.subMenu ? (
            <SubMenu
              key={item.name}
              title={
                <div className="flex items-center">
                  <item.icon className="mr-2 text-xl" />
                  <span>{!collapsed && item.name}</span>
                </div>
              }
            >
              {item.subMenu.map((subItem) => (
                <MenuItem key={subItem.name}>
                  <Link to={subItem.path} className="block w-full px-3 py-2 bg-teal-600 transition-colors duration-300" style={{ backgroundColor: "teal", color: "white" }}>
                    {!collapsed && subItem.name}
                  </Link>
                </MenuItem>
              ))}
            </SubMenu>
          ) : (
            <MenuItem key={item.name}>
              <Link to={item.path}>
                <div className="flex items-center">
                  <item.icon className="mr-2 text-xl" />
                  {!collapsed && item.name}
                </div>
              </Link>
            </MenuItem>
          )
        ))}
      </Menu>

      <div className="mt-auto p-4" style={{ backgroundColor: "teal" }}>
        {isAdmin && (
          <button onClick={onLogout} className="text-white hover:text-gray-300">
            Logout
          </button>
        )}
      </div>

      <button
        onClick={() => setToggled(!toggled)}
        className="fixed top-4 text-2xl left-4 lg:hidden z-50 bg-teal-600 text-white p-2 rounded-md"
      >
        <FaBars />
      </button>
    </ProSidebar>
  );
};

Sidebar.propTypes = {
  menuItems: PropTypes.array.isRequired,
  isAdmin: PropTypes.bool,
  onLogout: PropTypes.func,
};

export default Sidebar;

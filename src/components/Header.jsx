import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";

function Header({ title, actions, profile, className }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className={`flex justify-between items-center p-4 ${className}`}>
      <div className="text-2xl font-semibold ">{title}</div>

      <div className="flex items-center space-x-4 sm:space-x-6">
        {actions && (
          <div className="hidden sm:flex space-x-4">
            {actions.map((action, index) => (
              <div
                key={index}
                className="text-gray-600 font-medium cursor-pointer hover:text-white transition"
              >
                {action}
              </div>
            ))}
          </div>
        )}

        {profile && (
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md transition-transform transform hover:scale-105">
            {profile.initial || "?"}
          </div>
        )}

        <div className="sm:hidden">
          <button
            onClick={toggleMenu}
            className="text-white p-2 bg-teal-500 rounded-md hover:bg-teal-600 transition"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden absolute top-16 left-0 right-0 bg-teal-600 p-4">
          <div className="flex flex-col space-y-4">
            {actions.map((action, index) => (
              <div
                key={index}
                className="text-white font-medium cursor-pointer hover:text-teal-300"
              >
                {action}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(PropTypes.node),
  profile: PropTypes.shape({
    initial: PropTypes.string,
  }),
  className: PropTypes.string,
};

// Header.defaultProps = {
//   actions: [],
//   profile: null,
//   className: "",
// };

export default Header;

import React from "react";
import PropTypes from "prop-types";

function Header({ title, actions, profile, className }) {
  return (
    <div
      className={`flex justify-between items-center p-4 ${className}`}
    >
      <div className="text-2xl font-semibold text-white">{title}</div>

      <div className="flex items-center space-x-4">
        {actions &&
          actions.map((action, index) => (
            <div
              key={index}
              className="text-gray-600 font-medium cursor-pointer hover:text-white transition"
            >
              {action}
            </div>
          ))}

        {profile && (
          <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white font-semibold shadow-md transition-transform transform hover:scale-105">
            {profile.initial || "?"}
          </div>
        )}
      </div>
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

Header.defaultProps = {
  actions: [],
  profile: null,
  className: "", 
};

export default Header;

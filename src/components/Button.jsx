import React from "react";

function Button({ children, className, onClick }) {
  const defaultStyles =
    "px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200";

  return (
    <button onClick={onClick} className={`${defaultStyles} ${className}`}>
      {children}
    </button>
  );
}

export default Button;

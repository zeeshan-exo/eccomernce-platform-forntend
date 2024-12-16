import React from "react";

function Button({ children, className, onClick }) {
  const defaultStyles =
    "px-3 py-2   ";

  return (
    <button onClick={onClick} className={`${defaultStyles} ${className}`}>
      {children}
    </button>
  );
}

export default Button;

import React from "react";

const Button = ({ children, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      {...props}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {children}
    </button>
  );
};

export default Button;

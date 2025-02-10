import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const Button = ({ children, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ${className}`}
    >
      {children}
    </button>
  );
};

// เพิ่ม PropTypes
Button.propTypes = {
  children: PropTypes.node.isRequired, // children ควรเป็น Node และต้องมีค่าเสมอ
  onClick: PropTypes.func.isRequired, // onClick ควรเป็น Function และต้องมีค่าเสมอ
  className: PropTypes.string,        // className เป็น String (ไม่จำเป็นต้องใส่)
};

Button.defaultProps = {
  className: "", // Default className เป็น string ว่าง
};

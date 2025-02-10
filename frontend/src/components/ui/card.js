import React from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md p-4 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader = ({ children }) => {
  return <div className="text-lg font-bold mb-2">{children}</div>;
};

export const CardContent = ({ children }) => {
  return <div className="text-gray-700">{children}</div>;
};

// เพิ่ม PropTypes
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Card.defaultProps = {
  className: "",
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
};

CardContent.propTypes = {
  children: PropTypes.node.isRequired,
};

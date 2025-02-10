import React from "react";
import PropTypes from "prop-types";

const Heading = ({ heading, className }) => {
  return <div className={`text-3xl font-semibold pb-6 ${className}`}>{heading}</div>;
  // return <div className="text-3xl font-semibold pb-6">{heading}</div>;
};

Heading.propTypes = {
  heading: PropTypes.string.isRequired,
  className: PropTypes.string // เพิ่ม prop สำหรับรับค่า className
};
Heading.defaultProps = {
  className: "", // กำหนดค่าเริ่มต้นเป็นค่าว่าง
};

export default Heading;

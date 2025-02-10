import React from "react";
import PropTypes from "prop-types";  // นำเข้า PropTypes

const Flex = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

// เพิ่ม propTypes เพื่อทำการตรวจสอบชนิดของ props ที่ส่งเข้ามา
Flex.propTypes = {
  children: PropTypes.node.isRequired,  // กำหนดว่า children เป็น node และจำเป็นต้องส่งค่าเข้ามา
  className: PropTypes.string           // กำหนดว่า className ต้องเป็น string
};

export default Flex;

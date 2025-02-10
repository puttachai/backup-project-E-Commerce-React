import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import PropTypes from "prop-types";  // นำเข้า PropTypes

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div
      className="w-14 h-14 rounded-full text-white bg-black bg-opacity-40 hover:bg-opacity-100 duration-300 cursor-pointer flex justify-center items-center z-10 absolute top-[35%] right-2"
      onClick={onClick}
    >
      <span className="text-xl">
        <FaLongArrowAltRight />
      </span>
    </div>
  );
};

// เพิ่ม propTypes เพื่อตรวจสอบ prop onClick
SampleNextArrow.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SampleNextArrow;

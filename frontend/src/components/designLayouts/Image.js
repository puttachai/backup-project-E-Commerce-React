import React from "react";
import PropTypes from "prop-types";  // นำเข้า PropTypes

const Image = ({ imgSrc, className }) => {
  return <img className={className} src={imgSrc} alt={imgSrc} />;
};

Image.propTypes = {
  imgSrc: PropTypes.string,
  className: PropTypes.string,
};

export default Image;

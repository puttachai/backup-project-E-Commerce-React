
import PropTypes from "prop-types";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { bannerImgOne, bannerImgTwo, bannerImgThree } from "../../assets/images";
import Image from "../designLayouts/Image";

const CustomSlide = ({ Subtext, imgSrc, text, buttonLink, buttonText }) => (
  <div
    style={{
      position: "relative",
      backgroundColor: "#F5F5F3",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
    }}
  >
    <div
      style={{
        maxWidth: "80%",
        marginBottom: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "10px",
          fontSize: "2rem",
          color: "#000",
          fontWeight: "700",
        }}
      >
        {text}
      </h1>
      <p
        style={{
          marginBottom: "20px",
          fontSize: "1rem",
          color: "#666",
        }}
      >
        {Subtext}
      </p>

      <Link to={buttonLink}>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "1rem",
            padding: "10px 20px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          {buttonText}
        </button>
      </Link>
    </div>
    <div style={{ maxWidth: "100%", height: "auto" }}>
      <Image imgSrc={imgSrc} />
    </div>
  </div>
);

CustomSlide.propTypes = {
  Subtext: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  buttonLink: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev, next) => setDotActive(next),
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === dotActive
            ? {
                width: "30px",
                color: "#262626",
                border: "2px solid #262626",
                padding: "5px",
                cursor: "pointer",
                textAlign: "center",
                fontSize: "12px",
              }
            : {
                width: "30px",
                color: "transparent",
                border: "2px solid transparent",
                padding: "5px",
                cursor: "pointer",
                textAlign: "center",
                fontSize: "12px",
              }
        }
      >
        {i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
                {dots}
              </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "25px",
                      color: "#262626",
                      border: "2px solid #262626",
                      padding: "5px",
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: "10px",
                    }
                  : {
                      width: "25px",
                      color: "transparent",
                      border: "2px solid transparent",
                      padding: "5px",
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: "10px",
                    }
              }
            >
              {i + 1}
            </div>
          ),
        },
      },
      {
        breakpoint: 576,
        settings: {
          dots: true,
          appendDots: (dots) => (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              <ul style={{ margin: "0px", padding: "0px", listStyle: "none" }}>
                {dots}
              </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              style={
                i === dotActive
                  ? {
                      width: "20px",
                      color: "#262626",
                      border: "2px solid #262626",
                      padding: "5px",
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: "8px",
                    }
                  : {
                      width: "20px",
                      color: "transparent",
                      border: "2px solid transparent",
                      padding: "5px",
                      cursor: "pointer",
                      textAlign: "center",
                      fontSize: "8px",
                    }
              }
            >
              {i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc: bannerImgOne,
      text: "Enhance Your Printing Experience",
      Subtext: "Explore our premium printers and consumables for exceptional results",
      buttonLink: "/offer",
      buttonText: "Shop Now",
    },
    {
      imgSrc: bannerImgTwo,
      text: "Quality Printing Solutions",
      Subtext: "Discover our wide range of printers and consumables designed for professional printing needs.",
      buttonLink: "/shop",
      buttonText: "About-us",
    },
    {
      imgSrc: bannerImgThree,
      text: "Efficiency Redefined",
      Subtext: "Maximize productivity with our advanced printers and high-quality consumables.",
      buttonLink: "/contact",
      buttonText: "Contact-us",
    },
    // Add more slides as needed
  ];

  return (
    <div style={{ width: "100%", backgroundColor: "#ffffff", position: "relative" }}>
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;

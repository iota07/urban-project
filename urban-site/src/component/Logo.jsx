import React from "react";
import logo from "../assets/2024_06_BW_logo2024_whiteB.png";

function Logo({ onClick }) {
  return (
    <img
      src={logo}
      alt="Logo"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    />
  );
}

export default Logo;

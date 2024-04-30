import React from "react";
import logo from "../assets/Logo_200x200.png";

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

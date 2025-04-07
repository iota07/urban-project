import React from "react";
import { useMediaQuery } from "react-responsive";
import { FaHome, FaUser, FaProjectDiagram, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MobileNav = () => {
  const isMobile = useMediaQuery({ maxWidth: 1024 });
  const navigate = useNavigate();

  if (!isMobile) return null;

  return (
    <nav className="fixed bottom-0 w-full bg-primary text-backg flex justify-around py-4 z-20">
      <button
        className="flex flex-col items-center focus:outline-none"
        onClick={() => navigate("/workspace/dashboard")}
      >
        <FaHome className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
        <span className="text-xs sm:text-sm md:text-md lg:text-lg">
          Dashboard
        </span>
      </button>

      <button
        className="flex flex-col items-center focus:outline-none"
        onClick={() => navigate("/workspace/projects")}
      >
        <FaProjectDiagram className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
        <span className="text-xs sm:text-sm md:text-md lg:text-lg">
          My Projects
        </span>
      </button>
      <button
        className="flex flex-col items-center focus:outline-none"
        onClick={() => navigate("/workspace/create-project")}
      >
        <FaPlus className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
        <span className="text-xs sm:text-sm md:text-md lg:text-lg">
          New Project
        </span>
      </button>
      <button
        className="flex flex-col items-center focus:outline-none"
        onClick={() => navigate("/account")}
      >
        <FaUser className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
        <span className="text-xs sm:text-sm md:text-md lg:text-lg">
          My Account
        </span>
      </button>
    </nav>
  );
};

export default MobileNav;

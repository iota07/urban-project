import React from "react";
import { FaHome, FaUser, FaProjectDiagram, FaPlus } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Logo from "./Logo";
import { IoIosLogOut } from "react-icons/io";

function SideNav() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <>
      <nav className="hidden lg:block flex min-h-screen bg-primary text-backg z-20">
        <section className="flex flex-col h-screen mx-2 min-w-72">
          <section className="items-center pt-10 mb-24">
            <div className="px-14 w-[220px]">
              <Logo onClick={handleLogoClick} />
            </div>
          </section>

          <section className="space-y-2 px-2">
            <Link
              to="/workspace/dashboard"
              className="flex focus:outline-none hover:bg-secondary rounded-lg hover:text-primary p-2 pr-20"
              onClick={() => navigate("/workspace/dashboard")}
            >
              <FaHome className="lg:text-4xl" />
              <span className="lg:text-2xl py-2 mx-2">Dashboard</span>
            </Link>

            <Link
              to="/workspace/projects"
              className="flex focus:outline-none hover:bg-secondary rounded-lg hover:text-primary p-2 pr-20"
              onClick={() => navigate("/workspace/projects")}
            >
              <FaProjectDiagram className="lg:text-4xl" />
              <span className="lg:text-2xl m-2">My Projects</span>
            </Link>
            <Link
              to="/workspace/create-project"
              className="flex focus:outline-none hover:bg-secondary rounded-lg hover:text-primary p-2 pr-20"
              onClick={() => navigate("/workspace/create-project")}
            >
              <FaPlus className="lg:text-4xl" />
              <span className="lg:text-2xl m-2">New Project</span>
            </Link>
          </section>

          <section className="space-y-2 px-2 mt-auto pb-12">
            <Link
              to="/account"
              className="flex focus:outline-none hover:bg-secondary rounded-lg hover:text-primary p-2 pr-20"
              onClick={() => navigate("/account")}
            >
              <FaUser className="lg:text-4xl" />
              <span className="lg:text-2xl m-2">My Account</span>
            </Link>
            <Link
              to="/logout"
              className="flex focus:outline-none hover:bg-secondary rounded-lg hover:text-primary p-2 pr-20"
              onClick={() => navigate("/Logout")}
            >
              <IoIosLogOut className="lg:text-5xl" />
              <span className="lg:text-2xl m-2">Logout</span>
            </Link>
          </section>
        </section>
      </nav>
    </>
  );
}

export default SideNav;

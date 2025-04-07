import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdAppRegistration } from "react-icons/md";
import { GrWorkshop } from "react-icons/gr";

function BurgerNoLogo() {
  // State to hold the authentication status
  const [isAuth, setIsAuth] = useState(false);
  // State to control the visibility of the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Function to update the authentication status
    const updateAuth = () => {
      setIsAuth(localStorage.getItem("access_token") !== null);
    };

    // Call the updateAuth function initially
    updateAuth();

    // Function to handle changes in authentication status
    const authChangeHandler = () => {
      updateAuth();
    };

    // Add event listeners for storage and authChange events
    window.addEventListener("storage", authChangeHandler);
    window.addEventListener("authChange", authChangeHandler);

    // Remove event listeners when the component is unmounted
    return () => {
      window.removeEventListener("storage", authChangeHandler);
      window.removeEventListener("authChange", authChangeHandler);
    };
  }, []);

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="py-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-end items-center pt-4">
            <div className="lg:hidden">
              <button onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? (
                  <FaTimes className="text-primary text-3xl md:text-4xl" />
                ) : (
                  <FaBars className="text-primary text-3xl md:text-4xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      <div
        className={`fixed inset-0 bg-white z-50 flex flex-col justify-center items-center transition-transform duration-300 ${
          isMobileMenuOpen
            ? "transform translate-x-0"
            : "transform translate-x-full"
        }`}
      >
        <button className="absolute top-4 right-4" onClick={toggleMobileMenu}>
          <FaTimes className="text-primary mr-4 mt-7 text-3xl md:text-4xl" />
        </button>
        <ul className="flex flex-col space-y-7 text-center md:space-y-8">
          <li>
            <Link
              to={isAuth ? "/home" : "/"}
              className="text-primary text-2xl flex items-center justify-center md:text-4xl"
              onClick={toggleMobileMenu}
            >
              <IoHomeOutline className="mr-2 md:mr-4 text-5xl text-primary md:text-6xl" />
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/subscriptions"
              className="text-primary text-2xl ml-10 flex items-center justify-center md:text-4xl md:pl-4"
              onClick={toggleMobileMenu}
            >
              <GrWorkshop className="mr-2 md:mr-4 text-5xl text-primary md:text-6xl" />
              Subscribe
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link
                to="/workspace/dashboard"
                className="text-primary text-2xl ml-14 flex items-center justify-center md:text-4xl md:pl-6"
                onClick={toggleMobileMenu}
              >
                <BsPersonWorkspace className="mr-2 md:mr-4 text-5xl text-primary md:text-6xl" />
                Workspace
              </Link>
            </li>
          )}
          {!isAuth && (
            <li>
              <Link
                to="/register"
                className="text-primary text-2xl ml-5 flex items-center justify-center md:text-4xl md:pl-6"
                onClick={toggleMobileMenu}
              >
                <MdAppRegistration className="mr-2 md:mr-4 text-5xl text-primary md:text-6xl" />
                Register
              </Link>
            </li>
          )}
          <li>
            {isAuth ? (
              <Link
                to="/logout"
                className="text-primary text-2xl ml-3 flex items-center justify-center md:text-4xl md:pl-2"
                onClick={toggleMobileMenu}
              >
                <IoIosLogOut className="mr-2 md:mr-4 text-5xl text-primary md:text-6xl" />
                Logout
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-primary text-2xl mr-2 flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                <IoIosLogIn className="mr-3 text-5xl text-primary" />
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}

export default BurgerNoLogo;

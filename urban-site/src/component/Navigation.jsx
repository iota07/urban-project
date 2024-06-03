import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdAppRegistration } from "react-icons/md";
import Logo from "./Logo";

function Navigation() {
  // State to hold the authentication status
  const [isAuth, setIsAuth] = useState(false);
  // State to control the visibility of the mobile menu
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Hook to get the navigate function from react-router-dom
  const navigate = useNavigate();

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

  // Function to handle clicks on the logo
  const handleLogoClick = () => {
    // Navigate to /home if authenticated, otherwise navigate to /
    navigate("/");
  };

  // Function to toggle the mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="py-2 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center md:pr-24">
            <div className="flex-shrink-0 w-24">
              <Logo onClick={handleLogoClick} />
            </div>
            <div className="hidden md:block">
              <ul className="flex md:text-3xl lg:text-4xl md:font-futura space-x-12">
                {isAuth && (
                  <>
                    <li>
                      <Link
                        to="/home"
                        className="text-primary custom-underline"
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/account"
                        className="text-primary custom-underline"
                      >
                        Account
                      </Link>
                    </li>
                  </>
                )}
                {!isAuth && (
                  <li>
                    <Link to="/" className="text-primary custom-underline">
                      Home
                    </Link>
                  </li>
                )}
                {!isAuth && (
                  <li>
                    <Link
                      to="/register"
                      className="text-primary custom-underline"
                    >
                      Register
                    </Link>
                  </li>
                )}
                <li>
                  {isAuth ? (
                    <Link
                      to="/logout"
                      className="text-primary custom-underline"
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link to="/login" className="text-primary custom-underline">
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
            <div className="md:hidden">
              <button onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? (
                  <FaTimes className="text-primary text-3xl" />
                ) : (
                  <FaBars className="text-primary text-3xl" />
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
          <FaTimes className="text-primary mr-4 mt-7 text-3xl" />
        </button>
        <ul className="flex flex-col space-y-7 text-center">
          <li>
            <Link
              to={isAuth ? "/home" : "/"}
              className="text-primary text-2xl flex items-center justify-center"
              onClick={toggleMobileMenu}
            >
              <IoHomeOutline className="mr-2 text-5xl text-primary" />
              Home
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link
                to="/account"
                className="text-primary text-2xl ml-5 flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                <CgProfile className="mr-2 text-5xl text-primary" />
                Account
              </Link>
            </li>
          )}
          {!isAuth && (
            <li>
              <Link
                to="/register"
                className="text-primary text-2xl ml-5 flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                <MdAppRegistration className="mr-2 text-5xl text-primary" />
                Register
              </Link>
            </li>
          )}
          <li>
            {isAuth ? (
              <Link
                to="/logout"
                className="text-primary text-2xl ml-3 flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                <IoIosLogOut className="mr-2 text-5xl text-primary" />
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

export default Navigation;

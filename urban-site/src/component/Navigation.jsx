import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { IoIosLogOut, IoIosLogIn } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { BsPersonWorkspace } from "react-icons/bs";
import { MdAppRegistration } from "react-icons/md";
import { GrWorkshop } from "react-icons/gr";
import useUser from "../hook/useUser";
import Logo from "./Logo";

function Navigation() {
  const [isAuth, setIsAuth] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({ name: "", surname: "" });

  const navigate = useNavigate();
  const location = useLocation();

  const userData = useUser();

  useEffect(() => {
    const updateAuth = () => {
      const accessToken = localStorage.getItem("access_token");
      setIsAuth(accessToken !== null);
      if (accessToken && userData.userData) {
        setUser({
          name: userData.userData.name,
          surname: userData.userData.surname,
        });
      } else {
        setUser({ name: "", surname: "" });
      }
    };

    updateAuth();

    const authChangeHandler = () => {
      updateAuth();
    };

    window.addEventListener("storage", authChangeHandler);
    window.addEventListener("authChange", authChangeHandler);

    return () => {
      window.removeEventListener("storage", authChangeHandler);
      window.removeEventListener("authChange", authChangeHandler);
    };
  }, [userData]);

  useEffect(() => {
    if (isAuth && userData.userData) {
      setUser({
        name: userData.userData.name,
        surname: userData.userData.surname,
      });
    }
  }, [isAuth, userData]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getUserInitials = () => {
    const nameInitial = user.name ? user.name.charAt(0) : "";
    const surnameInitial = user.surname ? user.surname.charAt(0) : "";
    return `${nameInitial}${surnameInitial}`;
  };

  return (
    <>
      <nav className="py-2 md:py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center pr-4 lg:pr-24">
            <div className="flex-shrink-0 w-24 sm:w-28 my-2 sm:m-4">
              <Logo onClick={handleLogoClick} />
            </div>
            <div className="hidden lg:block">
              <ul className="flex md:text-3xl lg:text-4xl space-x-12">
                {isAuth ? (
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
                        to="/subscriptions"
                        className="text-primary custom-underline"
                      >
                        Subscribe
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/logout"
                        className="text-primary custom-underline"
                      >
                        Logout
                      </Link>
                    </li>
                    {user.name && user.surname && (
                      <li>
                        <Link
                          to="/account"
                          className="flex items-center justify-center bg-primary text-white text-xl rounded-full h-10 w-10"
                        >
                          {getUserInitials()}
                        </Link>
                      </li>
                    )}
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/" className="text-primary custom-underline">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/subscriptions"
                        className="text-primary custom-underline"
                      >
                        Subscribe
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/register"
                        className="text-primary custom-underline"
                      >
                        Register
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        className="text-primary custom-underline"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            <div className="lg:hidden sm:mb-20">
              <button onClick={toggleMobileMenu}>
                {isMobileMenuOpen ? (
                  <FaTimes className="text-primary text-3xl" />
                ) : (
                  <FaBars className="text-primary text-3xl " />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
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
          <li>
            <Link
              to="/subscriptions"
              className="text-primary text-2xl ml-10 flex items-center justify-center"
              onClick={toggleMobileMenu}
            >
              <GrWorkshop className="mr-2 text-5xl text-primary" />
              Subscribe
            </Link>
          </li>
          {isAuth && (
            <li>
              <Link
                to="/workspace/dashboard"
                className="text-primary text-2xl ml-14 flex items-center justify-center"
                onClick={toggleMobileMenu}
              >
                <BsPersonWorkspace className="mr-2 text-5xl text-primary" />
                Workspace
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

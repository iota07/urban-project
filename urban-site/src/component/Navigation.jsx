import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";

function Navigation() {
  // State to hold the authentication status
  const [isAuth, setIsAuth] = useState(false);

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
    navigate(isAuth ? "/home" : "/");
  };

  return (
    <>
      <nav className="p-4 border-b-2 border-[#1E73BE]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 w-24">
              {/* Pass the handleLogoClick function as a prop to the Logo component */}
              <Logo onClick={handleLogoClick} />
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-4">
                {/* Show the Home link only if authenticated */}
                {isAuth && (
                  <li>
                    <Link
                      to="/home"
                      className="text-[#1E73BE] hover:text-gray-300"
                    >
                      Home
                    </Link>
                  </li>
                )}
                <li>
                  {/* Show the Logout link if authenticated, otherwise show the Login link */}
                  {isAuth ? (
                    <Link
                      to="/logout"
                      className="text-[#1E73BE] hover:text-gray-300"
                    >
                      Logout
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="text-[#1E73BE] hover:text-gray-300"
                    >
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;

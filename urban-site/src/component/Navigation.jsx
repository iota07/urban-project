import React, { useState, useEffect } from "react";
import Logo from "./Logo";

function Navigation() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Function to update isAuth based on the presence of an access token
    const updateAuth = () => {
      setIsAuth(localStorage.getItem("access_token") !== null);
    };

    // Update isAuth when the component mounts
    updateAuth();

    // Add event listener for storage event
    window.addEventListener("storage", updateAuth);

    // Remove event listener on cleanup
    return () => {
      window.removeEventListener("storage", updateAuth);
    };
  }, [localStorage.getItem("access_token")]); // Run when the component mounts and whenever the access token changes

  const handleLogoClick = () => {
    // Handle the click event for the Logo component
    window.location.href = "/";
  };

  return (
    <>
      <nav className="p-4 border-b-2 border-[#1E73BE]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0 w-24">
              <Logo onClick={handleLogoClick} />
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-4">
                {isAuth && (
                  <li>
                    <a
                      href="/home"
                      className="text-[#1E73BE] hover:text-gray-300"
                    >
                      Home
                    </a>
                  </li>
                )}
                <li>
                  {isAuth ? (
                    <a
                      href="/logout"
                      className="text-[#1E73BE] hover:text-gray-300"
                    >
                      Logout
                    </a>
                  ) : (
                    <a
                      href="/login/"
                      className="text-[#1E73BE] hover:text-gray-300"
                    >
                      Login
                    </a>
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

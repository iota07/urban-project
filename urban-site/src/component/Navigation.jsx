import React, { useState, useEffect } from "react";
import Logo from "./Logo";

function Navigation() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check if access token exists in localStorage
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]); // Dependency array to watch for changes in authentication state

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
                    <a href="/" className="text-[#1E73BE] hover:text-gray-300">
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
                      href="/login"
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

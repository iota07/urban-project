import React, { useState, useEffect } from "react";

function Navigation() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Check if access token exists in localStorage
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]); // Dependency array to watch for changes in authentication state

  return (
    <>
      <nav className="bg-gray-900 p-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <a href="/" className="text-white font-bold text-xl">
                JWT Authentication
              </a>
            </div>
            <div className="hidden md:block">
              <ul className="flex space-x-4">
                {isAuth && (
                  <li>
                    <a href="/" className="text-white hover:text-gray-300">
                      Home
                    </a>
                  </li>
                )}
                <li>
                  {isAuth ? (
                    <a
                      href="/logout"
                      className="text-white hover:text-gray-300"
                    >
                      Logout
                    </a>
                  ) : (
                    <a href="/login" className="text-white hover:text-gray-300">
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

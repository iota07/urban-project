import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { IoIosSync } from "react-icons/io";
import { isUserAuthenticated } from "../utils/auth";
import refreshToken from "../utils/refresh";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(true);
    }, 2000);

    const checkAuth = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        const isValid = await isUserAuthenticated(token);
        if (!isValid) {
          // Attempt to refresh the token
          const refreshed = await refreshToken();
          if (!refreshed) {
            // If token refresh fails, remove tokens
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
          }
          setIsAuthenticated(refreshed);
        } else {
          setIsAuthenticated(true);
        }
      } else {
        // If no token is found, consider it as not authenticated
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
      }
      clearTimeout(timer);
      setIsLoading(false);
      setShowSpinner(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      showSpinner && (
        <div className="flex py-24 mt-24 justify-center items-center">
          <IoIosSync className="animate-spin h-36 w-36 text-primary" />
        </div>
      )
    );
  }

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;

import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";
import { isUserAuthenticated } from "../utils/auth";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  // Add an authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(() => {
    // Listen for the custom event
    const handleTokenChange = () => {
      setToken(localStorage.getItem("access_token"));
    };

    window.addEventListener("tokenChanged", handleTokenChange);

    return () => {
      window.removeEventListener("tokenChanged", handleTokenChange);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        if (accessToken && (await isUserAuthenticated(accessToken))) {
          setIsAuthenticated(true); // Update authentication state
          const config = {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          };
          const response = await axios.get(`${BACKEND_URL}/user/`, config);
          if (response.data) {
            const { id, username, email, name, surname, organisation } =
              response.data;
            setUserData({ id, username, email, name, surname, organisation });
          }
        } else {
          setIsAuthenticated(false); // Update authentication state
          setUserData(null); // Reset userData when not authenticated
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated, token]); // Use the authentication state in dependency array

  return (
    <UserContext.Provider value={{ userData, setUserData, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

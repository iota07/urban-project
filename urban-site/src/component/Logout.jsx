import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";

const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        await axios.post(
          `${BACKEND_URL}/logout/`,
          {
            refresh_token: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
          }
        );

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");

        window.location.href = "/";
      } catch (error) {
        console.error("Logout failed:", error);
      }
    })();
  }, []);
  return <div></div>;
};

export default Logout;

import { useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";

const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if (!accessToken || !refreshToken) {
          console.error("No access or refresh token found in local storage");
          return;
        }

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);

        const response = await axios({
          method: "post",
          url: `${BACKEND_URL}/logout/`,
          data: {
            refresh_token: refreshToken,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        });

        console.log("Logout response:", response);

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.dispatchEvent(new CustomEvent("tokenChanged"));
        window.location.href = "/";
      } catch (error) {
        if (error.response) {
          console.error(
            "Logout failed:",
            error.response.data,
            error.response.status
          );
        } else {
          console.error("Logout failed:", error.message);
        }
      }
    })();
  }, []);
  return <div></div>;
};

export default Logout;

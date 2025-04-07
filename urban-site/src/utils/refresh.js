import axios from "axios";
import { BACKEND_URL } from "./config";

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    console.error("No refresh token found in localStorage.");
    return false;
  }

  try {
    const response = await axios.post(`${BACKEND_URL}/token/refresh/`, {
      refresh: refreshToken,
    });

    if (response.status !== 200) {
      console.error(
        "Failed to refresh token:",
        response.status,
        response.statusText,
        response.data
      );
      throw new Error("Failed to refresh token");
    }

    const data = response.data;
    localStorage.setItem("access_token", data.access);
    localStorage.setItem("refresh_token", data.refresh);
    window.dispatchEvent(new CustomEvent("tokenChanged"));
    return true;
  } catch (error) {
    console.error(
      "Error refreshing token:",
      error.response ? error.response.data : error.message,
      error
    );
    return false;
  }
};

export default refreshToken;

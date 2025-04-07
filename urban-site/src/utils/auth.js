import axios from "axios";
import { BACKEND_URL } from "./config";

export const validateToken = async (token) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/token/verify/`, {
      token: token,
    });

    if (response.status === 200) {
      return true;
    } else {
      console.error("Unexpected response from token verification:", response);
      return false;
    }
  } catch (error) {
    console.error(
      "Token verification failed:",
      error.response ? error.response.data : error.message,
      error
    );
    return false;
  }
};

export const isUserAuthenticated = async (token) => {
  const isValid = await validateToken(token);
  return isValid;
};

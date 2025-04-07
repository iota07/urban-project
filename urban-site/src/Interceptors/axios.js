import axios from "axios";
import { BACKEND_URL } from "../utils/config";

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.request.use(
  async (config) => {
    console.log(
      `Sending request to ${config.url} with method ${config.method}`
    );

    if (config.url.includes("/token/login/")) {
      return config;
    }

    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => {
    if (
      response.config.url.includes("/token/login/") &&
      !response.config.url.includes("/token/refresh/")
    ) {
      window.location.href = "/home";
    }
    return response;
  },
  async (error) => {
    console.error("Axios response error:", error);

    if (!error.response) {
      window.location.href = "/error";
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const originalRequest = error.config;
    console.log("Original request:", originalRequest);

    // Handle 401 errors for Google Sign-In separately
    if (
      status === 401 &&
      originalRequest.url.includes(`${BACKEND_URL}/auth/google/`)
    ) {
      console.error("Google token exchange failed:", error);
      return Promise.reject(error);
    }

    // Handle token refresh logic for other endpoints
    if (
      status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== `${BACKEND_URL}/token/login/`
    ) {
      if (
        originalRequest.url.includes(`${BACKEND_URL}/token/refresh/`) &&
        data.code === "token_not_valid"
      ) {
        console.error("Token refresh failure:", data);

        // Clear tokens and redirect
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      if (!isRefreshing) {
        console.log("Attempting token refresh");
        isRefreshing = true;

        const refreshToken = localStorage.getItem("refresh_token");

        try {
          const refreshResponse = await axios.post(
            `${BACKEND_URL}/token/refresh/`,
            { refresh: refreshToken },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );

          console.log("Token refresh success:", refreshResponse.data);
          const newAccessToken = refreshResponse.data.access;
          const newRefreshToken = refreshResponse.data.refresh;

          localStorage.setItem("access_token", newAccessToken);
          localStorage.setItem("refresh_token", newRefreshToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);

          return axios(originalRequest);
        } catch (refreshError) {
          console.error("Token refresh error:", refreshError);

          // Clear tokens and redirect if refresh fails
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          window.location.href = "/login";
          processQueue(refreshError, null);
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    if (status === 500) {
      window.location.href = "/error";
      return Promise.reject(error);
    }

    if (status >= 400) {
      console.error("Client Error:", error.response.data);
    }

    return Promise.reject(error);
  }
);

export default axios;

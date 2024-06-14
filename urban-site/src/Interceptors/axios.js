import axios from "axios";
import { BACKEND_URL } from "../utils/config";

// Flag to indicate if a token refresh is in progress
let isRefreshing = false;

// Queue to hold Axios requests that failed due to an expired token
let failedQueue = [];

// Function to dispatch an event when the authentication status changes
const updateAuthStatus = () => {
  const event = new Event("authChange");
  window.dispatchEvent(event);
};

// Add a request interceptor to Axios
axios.interceptors.request.use(
  (config) => {
    // Exclude the login route from the interceptor
    if (config.url.includes("/token/login/")) {
      return config;
    }

    // Retrieve the access token from local storage
    const accessToken = localStorage.getItem("access_token");

    // If access token exists, add it to the headers for authentication
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to Axios
axios.interceptors.response.use(
  (response) => {
    // If the response was successful, return it
    return response;
  },
  async (error) => {
    console.log(error);
    // If the server is not reachable
    if (!error.response) {
      // Redirect to an error page or display a suitable message
      window.location.href = "/error";
      return Promise.reject(error);
    }

    // Get the original request configuration
    const originalRequest = error.config;

    // If the response status was 401 (Unauthorized) and this is the first retry attempt
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== `${BACKEND_URL}/token/login/` &&
      error.response.data.code === "token_not_valid"
    ) {
      // If a token refresh is already in progress
      if (isRefreshing) {
        try {
          // Create a new Promise that resolves with the response of the original request
          const response = await new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          });
          // Update the Authorization header with the new token
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          // Retry the original request
          return axios(originalRequest);
        } catch (err) {
          // If an error occurred while retrying the request, reject the Promise
          return Promise.reject(err);
        }
      }

      // Mark the request as retried
      originalRequest._retry = true;
      // Start a token refresh
      isRefreshing = true;

      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post(
          `${BACKEND_URL}/token/refresh/`,
          {
            refresh: localStorage.getItem("refresh_token"),
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        // Store the new tokens in local storage
        localStorage.setItem("access_token", refreshResponse.data.access);
        localStorage.setItem("refresh_token", refreshResponse.data.refresh);

        // Update the Authorization header with the new token
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.access}`;

        // Retry all failed requests
        failedQueue.forEach((prom) => prom.resolve(refreshResponse));
        // Clear the request queue
        failedQueue = [];
        // Retry the original request
        return axios(originalRequest);
      } catch (err) {
        // If an error occurred while refreshing the token, clear local storage and redirect to the login page
        localStorage.clear();
        window.location.href = "/login";
        // Reject the Promise
        return Promise.reject(err);
      } finally {
        // Reset the token refresh flag
        isRefreshing = false;
        // Dispatch an event to update the authentication status
        updateAuthStatus();
      }
    } else if (error.response.status === 401) {
      // Handle other 401 errors here

      return Promise.reject(error);
    } else if (error.response.status === 500) {
      // Redirect to an error page or display a generic error message
      window.location.href = "/error";
      return Promise.reject(error);
    } // If the response status was 400 or above, redirect to the error page
    else if (error.response.status >= 400) {
      // Check if the error is a validation error
      if (Object.keys(error.response.data).length > 0) {
        // Check if the current frontend URL matches the password reset page
        if (window.location.pathname.startsWith("/reset-password")) {
          // Check if there's a validation error for the token field with 'Invalid value' message
          if (
            error.response.data.token &&
            error.response.data.token.includes("Invalid value")
          ) {
            window.location.href = "/error";
          }
        }
      }
    }

    // If the response status was not 401 or this was not the first retry attempt, reject the Promise
    return Promise.reject(error);
  }
);

export default updateAuthStatus;

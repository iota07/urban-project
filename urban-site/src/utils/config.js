// config.js

const backendUrl = import.meta.env.VITE_APP_BACKEND_URL;

if (!backendUrl) {
  throw new Error(
    "VITE_APP_BACKEND_URL is not defined. Please set this environment variable."
  );
}

export const BACKEND_URL = backendUrl;

const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

if (!clientId) {
  throw new Error(
    "VITE_APP_GOOGLE_CLIENT_ID is not defined. Please set this environment variable."
  );
}

export const GOOGLE_CLIENT_ID = clientId;

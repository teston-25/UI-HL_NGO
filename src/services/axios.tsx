import axios from "axios";

// Dynamically handle environment routing
const getBaseURL = () => {
  // Using standard process.env check or a fallback type cast
  if (process.env.NODE_ENV === "development" || (import.meta.env as any).DEV) {
    return "/api";
  }
  return "https://prms-backend-rrdo.onrender.com/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("hibret_admin_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses and edge-case errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      !error.response ||
      error.code === "ERR_NETWORK" ||
      error.response?.status === 0
    ) {
      console.error(
        "Network/CORS Error: Unable to connect to the server. Please check if the backend is running and CORS is properly configured.",
      );
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      localStorage.removeItem("hibret_admin_token");
      localStorage.removeItem("hibret_admin_data");
      window.location.href = "/admin";
      return Promise.reject(error);
    }

    if (error.response.status === 429) {
      console.warn("Rate limited:", error.response.data?.message);
    }

    return Promise.reject(error);
  },
);

export default api;

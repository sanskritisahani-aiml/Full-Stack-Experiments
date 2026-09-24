import axios from "axios";
import { getToken, logout, saveToken } from "../utils/auth";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (error.response?.status === 401) {
      const oldToken = getToken();

      if (oldToken) {
        // Simulate getting a new access token
        const newToken = oldToken;

        saveToken(newToken);

        // Retry the original request
        error.config.headers.Authorization = `Bearer ${newToken}`;

        return api(error.config);
      }

      logout();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default api;
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://scrapely-backend.onrender.com/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Attach JWT Bearer Token
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          if (res.data.access_token) {
            localStorage.setItem("access_token", res.data.access_token);
            originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
            return api(originalRequest);
          }
        }
      } catch (refreshErr) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        if (typeof window !== "undefined" && !window.location.pathname.includes("/signin")) {
          window.location.href = "/signin/";
        }
      }
    }
    return Promise.reject(error);
  }
);

import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://scrapely-backend.onrender.com/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Query Error:", error);
    return Promise.resolve({ data: { leads: [], total: 0 } });
  }
);

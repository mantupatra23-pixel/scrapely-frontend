import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://scrapely-backend.onrender.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'https://scrapely-backend.onrender.com/api/v1'}/auth/refresh`, {
          refresh_token: refreshToken,
        });
        localStorage.setItem('access_token', res.data.access_token);
        originalRequest.headers.Authorization = `Bearer ${res.data.access_token}`;
        return api(originalRequest);
      } catch (refreshErr) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/signin';
      }
    }
    return Promise.reject(error);
  }
);

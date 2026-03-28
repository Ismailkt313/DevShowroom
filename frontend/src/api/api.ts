import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

console.log(API_URL,'API_URL');

const api = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true, // For handling HTTP-only cookies like refreshToken
});

// Add a request interceptor to attach the access token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

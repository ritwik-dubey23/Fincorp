import axios from 'axios';

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (!envUrl) return '/api';
  // Strip trailing slashes
  const cleanUrl = envUrl.replace(/\/+$/, '');
  // Append /api if not already present
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
};

const API = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercept requests to attach Authorization header from localStorage if present
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('fincorp_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;

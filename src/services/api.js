import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

// Create axios instance với config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor (optional - for auth, etc.)
api.interceptors.request.use(
  config => {
    // Có thể thêm token vào đây
    // config.headers.Authorization = `Bearer ${token}`;
    console.log('📡 API Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  error => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor (optional - for error handling)
api.interceptors.response.use(
  response => {
    console.log('✅ API Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('❌ Response Error:', error.response?.status, error.message);
    return Promise.reject(error);
  }
);

export default api;
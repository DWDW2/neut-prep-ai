import axios from 'axios';
import { useSession } from '@clerk/nextjs';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your actual API base URL
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     config.headers.Authorization = `Bearer `;
//       return config;
//     },
//     (error) => Promise.reject(error)
  // );

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

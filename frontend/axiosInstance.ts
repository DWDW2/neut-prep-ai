import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;


//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         const session = await getSession();
//         if (session) {
//           const response = await axiosInstance.post('/user/refresh-token', {
//             refreshToken: session.refreshToken,
//           });

//           const { accessToken } = response.data;

//           originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          
//           return axiosInstance(originalRequest);
//         }
//       } catch (error) {
//         console.error('Refresh token failed:', error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;

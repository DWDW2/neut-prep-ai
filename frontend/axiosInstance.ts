import axios from 'axios';
import { getSession, signOut, useSession } from 'next-auth/react';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 50000,
});

axiosInstance.interceptors.request.use(async (config) => {
  const session = await getSession();
  if (session?.accessToken) {
    config.headers.Authorization = `Bearer ${session.accessToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      signOut({ callbackUrl: '/login' });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;

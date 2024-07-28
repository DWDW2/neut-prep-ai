import axios from 'axios';
import { getSession, signOut, useSession } from 'next-auth/react';
import BASE_URL from './lib/env';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
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
      signOut({ callbackUrl: '/register' });
    }
    return Promise.reject(error);
  }
);
export default axiosInstance;

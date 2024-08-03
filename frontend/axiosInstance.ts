import axios from 'axios';
import { getSession, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import BASE_URL from './lib/env';
import { getServerSession } from 'next-auth';

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

export default axiosInstance;

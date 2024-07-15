import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Njk0NGU4ZjZhMjc0MWJjZDY1Y2JjMjQiLCJpYXQiOjE3MjEwNDc0OTUsImV4cCI6MTcyMTA1MTA5NX0.gtrkJbUZ5V6tPtpO3bdYSb88_w5xHVW2_R7g0fESBU8"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;

import axios, { AxiosError } from 'axios';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api',
  headers: { 'Content-Type': 'application/json' },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err: AxiosError<{ message?: string | string[] }>) => {
    const msg = err.response?.data?.message;
    const text = Array.isArray(msg) ? msg.join(', ') : (msg ?? err.message);
    return Promise.reject(new Error(text));
  },
);

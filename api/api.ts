import axios, { AxiosInstance } from "axios";

  const instance = axios.create({
    baseURL:
      (process.env.NEXT_PUBLIC_SITE_SECURE === "true" ? `https://` : `http://`) +
      process.env.NEXT_PUBLIC_SITE_URL,
    withCredentials: true,
  });

export default instance;


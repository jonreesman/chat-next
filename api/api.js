import axios from "axios";

export default axios.create({
  baseURL:
    (process.env.NEXT_PUBLIC_SITE_SECURE ? `https://` : `http://`) +
    process.env.NEXT_PUBLIC_SITE_URL,
  withCredentials: true,
});

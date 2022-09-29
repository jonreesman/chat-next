import axios from "axios";

export default axios.create({
  baseURL: `http://` + process.env.NEXT_PUBLIC_SITE_URL,
  withCredentials: true,
});

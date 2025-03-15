import axios from "axios";

const baseURL =
  process.env.NODE_ENVIRONMENT === "production" ? "/" : "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL,
});

export default axiosInstance;

import axios from "axios";
import { getFromLocalStorage } from "../utils/local-storage";

const axiosInstance = axios.create();

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.headers["Accept"] = "application/json";
axiosInstance.defaults.timeout = 60000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    const accessToken = getFromLocalStorage(process.env.NEXT_PUBLIC_AUTH_KEY);
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    return response?.data;
  },
  async function (error) {
    return Promise.reject(error.response ? error.response.data : error);
  }
);

export default axiosInstance;

import axios from "axios";
import { BASE_URL } from "./endpoints";
import { store } from "../store/store";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers["x-api-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(window.location);
    if (error.response.status === 403 && (!window.location.pathname.includes("login") && window.location.pathname !== ("/"))) {
      window.location.replace('/not-authorized');
    }
    return Promise.reject(error);
  }
);
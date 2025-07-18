import axios, { AxiosRequestConfig } from "axios";

const apiClientWithAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/v1",
  withCredentials: true,
});

apiClientWithAuth.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No auth token found in localStorage");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClientWithAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else if (error.response?.status === 400) {
      console.error("Bad Request:", error.response.data);
    }
    return Promise.reject(error);
  }
);

export default apiClientWithAuth;
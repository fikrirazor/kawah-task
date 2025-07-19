import axios, { InternalAxiosRequestConfig } from "axios"; // Ganti import

const apiClientWithAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

// Interceptor request
apiClientWithAuth.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No auth token found in localStorage");
    }
    return config; // Harus kembalikan InternalAxiosRequestConfig
  },
  (error) => Promise.reject(error)
);

// Interceptor response tetap sama
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
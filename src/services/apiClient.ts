import axios from "axios";

const appURL = "https://localhost:8443/api";

export const ApiClient = (pathUrl: String) => {
  // const baseURL = ;

  const apiClient = axios.create({
    baseURL: `${appURL}${pathUrl}`,
  });
  apiClient.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  return apiClient;
};

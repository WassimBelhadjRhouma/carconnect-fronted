import axios from "axios";

const appURL = "https://localhost:8443/api";

export const ApiClient = axios.create({
  baseURL: `${appURL}`,
});

export const setApiClientToken = (token: string | null) => {
  if (token) {
    ApiClient.defaults.headers.Authorization = `Bearer ${token}`;
  } else {
    delete ApiClient.defaults.headers.Authorization;
  }
};

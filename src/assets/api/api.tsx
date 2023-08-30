import axios from "axios"
import { getAccessToken } from "../../service/service.token"

// const token = getAccessToken();

export const api = axios.create({
  // baseURL: "http://localhost:3597/suport-back",
  // baseURL: "http://localhost:8080/suport",
  baseURL: "https://10.5.193.20/suport",
  // headers: { 'content-type': 'application/json' }
});

api.interceptors.request.use(async config => {
  const token = getAccessToken();
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
})
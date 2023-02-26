import axios from "axios";
import { ACCESS_TOKEN } from "./contants";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

client.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// client.interceptors.response.use((response) => {

//   return response
// })

export default client;

import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./contants";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { refreshToken } from "../services/auth";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

client.interceptors.request.use(async (config) => {
  let accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (config.baseURL?.includes("/logout")) {
    return config;
  }

  if (accessToken) {
    const decodedToken = jwt_decode<JwtPayload>(accessToken);

    if ((decodedToken.exp as number) * 1000 < new Date().getTime()) {
      if (!localStorage.getItem(REFRESH_TOKEN)) {
        return config;
      }

      try {
        const response = await refreshToken(
          localStorage.getItem(REFRESH_TOKEN) as string
        );

        accessToken = response.accessToken;

        localStorage.setItem(ACCESS_TOKEN, response.accessToken);
        localStorage.setItem(REFRESH_TOKEN, response.refreshToken);
      } catch (error) {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
      }
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default client;

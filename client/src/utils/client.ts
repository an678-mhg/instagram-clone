import axios from "axios";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "./contants";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { refreshToken } from "../services/auth";
import { RefreshTokenResponse } from "../types";
import { removeToken, setToken } from "./token";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let refreshTokenRequest: Promise<RefreshTokenResponse> | null = null;

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
        refreshTokenRequest = refreshTokenRequest
          ? refreshTokenRequest
          : refreshToken(localStorage.getItem(REFRESH_TOKEN) as string);

        const response = await refreshTokenRequest;

        accessToken = response.accessToken;

        setToken(response.accessToken, response.refreshToken);

        refreshTokenRequest = null;
      } catch (error) {
        removeToken();
      }
    }

    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

export default client;

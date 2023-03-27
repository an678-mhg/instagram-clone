import { ACCESS_TOKEN, REFRESH_TOKEN } from "./contants";

export const setToken = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const removeToken = () => {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
};

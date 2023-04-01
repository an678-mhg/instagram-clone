import axios from "axios";
import {
  GoogleLoginFormValue,
  MeResponse,
  refreshTokenFormValue,
  RefreshTokenResponse,
  Response,
  SignInFormValue,
  SignInResponse,
  SignUpFormValue,
  SignUpResponse,
} from "../types";
import client, { baseURL } from "../utils/client";

export const signIn = async (data: SignInFormValue) => {
  const response = await client.post<SignInResponse>("/auth/signin", data);
  return response.data;
};

export const getMe = async () => {
  const response = await client.get<MeResponse>("/auth/me");
  return response.data;
};

export const signUp = async (data: SignUpFormValue) => {
  const response = await client.post<SignUpResponse>("/auth/signup", data);
  return response.data;
};

export const googleLogin = async (data: GoogleLoginFormValue) => {
  const response = await client.post<SignInResponse>("/auth/google", data);
  return response.data;
};

export const logout = async (data: refreshTokenFormValue) => {
  const response = await client.post<Response>("/auth/logout", data);
  return response.data;
};

export const activeAccount = async (activeToken: string) => {
  const response = await client.get<SignInResponse>(
    `/auth/active/${activeToken}`
  );
  return response.data;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post<RefreshTokenResponse>(
    `${baseURL}/auth/refreshToken`,
    { refreshToken }
  );
  return response.data;
};

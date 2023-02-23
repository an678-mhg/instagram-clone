import { MeResponse, SignInFormValue, SignInResponse } from "../types";
import client from "../utils/client";

export const signIn = async (data: SignInFormValue) => {
  const response = await client.post<SignInResponse>("/auth/signin", data);
  return response.data;
};

export const getMe = async () => {
  const response = await client.get<MeResponse>("/auth/me");
  return response.data;
};

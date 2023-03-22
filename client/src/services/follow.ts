import { Response } from "../types";
import { SuggestAccount } from "../types/follow";
import client from "../utils/client";

export const getSuggestAccount = async () => {
  const response = await client.get<SuggestAccount>("/follow/suggest-account");
  return response.data.account;
};

export const followUser = async (user_follow: string) => {
  const response = await client.post<Response>("/follow/user", { user_follow });
  return response.data;
};

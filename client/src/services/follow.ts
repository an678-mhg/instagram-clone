import { SuggestAccount } from "../types/follow";
import client from "../utils/client";

export const getSuggestAccount = async () => {
  const response = await client.get<SuggestAccount>("/follow/suggest-account");
  return response.data;
};

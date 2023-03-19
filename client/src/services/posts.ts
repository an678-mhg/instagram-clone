import { CreatePostFormValue } from "../types";
import client from "../utils/client";

export const addPost = async (post: CreatePostFormValue) => {
  const response = await client.post("/posts/create", post);
  return response.data;
};

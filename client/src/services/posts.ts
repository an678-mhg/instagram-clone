import { CreatePostFormValue } from "../types";
import { HomeFeed } from "../types/posts";
import client from "../utils/client";

export const addPost = async (post: CreatePostFormValue) => {
  const response = await client.post("/posts/create", post);
  return response.data;
};

export const getPosts = async (limit: number, skip: number) => {
  const response = await client.get<HomeFeed>("/posts/gets", {
    params: {
      limit,
      skip,
    },
  });
  return response.data;
};

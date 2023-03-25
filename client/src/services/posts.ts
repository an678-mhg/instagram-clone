import { QueryFunctionContext } from "react-query";
import { CreatePostFormValue, Response } from "../types";
import { HomeFeed } from "../types/posts";
import client from "../utils/client";

export const addPost = async (post: CreatePostFormValue) => {
  const response = await client.post("/posts/create", post);
  return response.data;
};

export const getPosts = async (
  limit: number,
  page: QueryFunctionContext<string[], any>,
  type: "feed" | "explore"
) => {
  const response = await client.get<HomeFeed>("/posts/gets", {
    params: {
      limit,
      skip: page?.pageParam || 0,
      type,
    },
  });
  return response.data;
};

export const likePost = async (post_id: string) => {
  const response = await client.post<Response>("/reaction/like", { post_id });
  return response.data;
};

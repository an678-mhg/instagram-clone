import { QueryFunctionContext } from "react-query";
import {
  CreateCommentFormValue,
  CreatePostFormValue,
  ReplyCommentFormValue,
  Response,
} from "../types";
import { CommentResponse, HomeFeed, PostDetail, Comment } from "../types/posts";
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

export const getPost = async (_id: string) => {
  const response = await client.get<PostDetail>(`/posts/get/${_id}`);
  return response.data.post;
};

export const getComment = async (
  post_id: string,
  parent_id: string | null = null
) => {
  const path = parent_id
    ? `/posts/comment/gets/${post_id}?parent_id=${parent_id}`
    : `/posts/comment/gets/${post_id}`;

  const response = await client.get<CommentResponse>(path);
  return response.data.comments;
};

export const createComment = async ({
  post_id,
  comment,
}: CreateCommentFormValue) => {
  const response = await client.post<{ success: Boolean; comment: Comment }>(
    "/posts/comment/create",
    {
      post_id,
      comment,
    }
  );
  return response.data.comment;
};

export const likeComment = async (comment_id: string) => {
  const response = await client.post<Response>("/reaction/like-comment", {
    comment_id,
  });
  return response.data;
};

export const replyComment = async (values: ReplyCommentFormValue) => {
  const response = await client.post<Response>(
    "/posts/reply-comment/create",
    values
  );
  return response.data;
};

export const removePost = async (post_id: string) => {
  const response = await client.post<Response>("/posts/remove", { post_id });
  return response.data;
};

export const editPost = async (values: CreatePostFormValue) => {
  const response = await client.post<Response>(
    `/posts/edit/${values._id}`,
    values
  );
  return response.data;
};

export const deleteComment = async (comment_id: string) => {
  const response = await client.post("/posts/comment/remove", { comment_id });
  return response.data;
};

import { Response } from "../types";

export interface HomeFeed extends Response {
  posts: Post[];
}

export interface Post {
  _id: string;
  caption: string;
  media: string[];
  user: User;
  like_count: number;
  comment_count: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
}

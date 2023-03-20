import { Response } from "../types";

export interface HomeFeed extends Response {
  posts: Post[];
  hashNextPage: boolean;
  nextSkip: number | null;
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
  is_liked: boolean;
}

export interface User {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
  is_follow: boolean;
}

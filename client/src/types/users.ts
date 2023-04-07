import { Response } from "../types";
import { Post } from "./posts";

export interface Profile {
  _id: string;
  fullname: string;
  username: string;
  avatar: string;
  post_count: number;
  followers_count: number;
  following_count: number;
  website: string;
  bio: string;
  is_follow: boolean;
  email: string;
}

export interface ProfileResponse extends Response {
  user: Profile;
}

export interface MyPostResponse extends Response {
  posts: Post[];
  hashNextPage: boolean;
  nextSkip: number | null;
}

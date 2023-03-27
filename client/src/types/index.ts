import React from "react";

export interface Layout {
  children: React.ReactNode;
}

export interface IconProps {
  className?: string;
  color?: string;
  width?: number;
  height?: number;
}

export interface Sidebar {
  icons: Function;
  title: string;
  href: string;
}

export interface SignInFormValue {
  email: string;
  password: string;
}

export interface SignUpFormValue {
  email: string;
  password: string;
  username: string;
  fullname: string;
}

export interface refreshTokenFormValue {
  refreshToken: string;
}

export interface RefreshTokenResponse extends Response {
  accessToken: string;
  refreshToken: string;
}

export interface GoogleLoginFormValue {
  idTokens: string;
}

export interface User {
  _id: string;
  fullname: string;
  username: string;
  website: string;
  bio: string;
  email: string;
  phone: string;
  active: boolean;
  provider: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Response {
  success: boolean;
  message: string;
}

export interface SignInResponse extends Response {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface MeResponse extends Response {
  user: User;
}

export interface SignUpResponse extends Response {
  user: User;
  result: any;
}

export interface CreatePostFormValue {
  caption: string;
  media: string[];
  post_type: "stories" | "posts";
  user_id: string;
}

export interface CreateCommentFormValue {
  post_id: string;
  comment: string;
}

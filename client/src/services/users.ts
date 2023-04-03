import { changeProfileFormValue } from "../pages/edit-profile";
import { Response } from "../types";
import { MyPostResponse, ProfileResponse } from "../types/users";
import client from "../utils/client";

export const getUserInfoById = async (_id: string) => {
  const response = await client.get<ProfileResponse>(`/users/get/${_id}`);
  return response.data;
};

export const getMyPost = async (_id: string) => {
  const resposne = await client.get<MyPostResponse>(`/users/get/posts/${_id}`);
  return resposne.data;
};

export const editProfile = async (values: changeProfileFormValue) => {
  const response = await client.put<Response>("/users/edit-profile", values);
  return response.data;
};

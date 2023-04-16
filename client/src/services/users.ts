import { QueryFunctionContext } from "react-query";
import { changeProfileFormValue } from "../pages/edit-profile";
import { Response, User } from "../types";
import { MyPostResponse, ProfileResponse } from "../types/users";
import client from "../utils/client";

export const getUserInfoById = async (_id: string) => {
  const response = await client.get<ProfileResponse>(`/users/get/${_id}`);
  return response.data;
};

export const getMyPost = async (
  _id: string,
  page: QueryFunctionContext<string[], any>
) => {
  const resposne = await client.get<MyPostResponse>(`/users/get/posts/${_id}`, {
    params: {
      limit: 6,
      skip: page.pageParam || 0,
    },
  });
  return resposne.data;
};

export const editProfile = async (values: changeProfileFormValue) => {
  const response = await client.put<Response>("/users/edit-profile", values);
  return response.data;
};

export const searchUsers = async (searchText: string) => {
  const response = await client.get<{ success: Boolean; users: User[] }>(
    "/users/search",
    {
      params: { searchText },
    }
  );
  return response.data;
};

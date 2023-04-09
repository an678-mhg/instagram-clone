import { Response } from ".";
import { User } from "./posts";

export interface Notification {
  _id: string;
  user: string[];
  from_user: User;
  post: string;
  comment: any;
  read: boolean;
  url: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NotificationResponse extends Response {
  notifications: Notification[];
}

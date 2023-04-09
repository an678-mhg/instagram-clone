import { createNotificationFormValue } from "../types";
import { NotificationResponse } from "../types/notification";
import client from "../utils/client";

export const createNotification = async (
  values: createNotificationFormValue
) => {
  const response = await client.post("/notifications/create", values);
  return response.data;
};

export const getNotification = async () => {
  const response = await client.get<NotificationResponse>(
    "/notifications/gets"
  );
  return response.data;
};

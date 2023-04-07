import { createNotificationFormValue } from "../types";
import client from "../utils/client";

export const createNotification = async (
  values: createNotificationFormValue
) => {
  const response = await client.post("/notifications/create", values);
  return response.data;
};

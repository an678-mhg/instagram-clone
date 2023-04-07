import { Request, Response } from "express";
import notificationsModels from "../models/notifications.models";
import { createNotificationFormValue } from "../types";

class notificationsControllers {
  async createNotification(req: Request, res: Response) {
    const { comment, post, type, user } =
      req.body as createNotificationFormValue;
    const from_user = req.body._id;

    if (!user || !type) {
      return res
        .status(400)
        .json({ success: false, message: "Missing paramerter" });
    }

    try {
      const newNotifications = new notificationsModels({
        from_user,
        user,
        read: false,
        type,
        url:
          type === "comment"
            ? `/post/${post}?comment_id=${comment}`
            : type === "like"
            ? `/post/${post}`
            : `/profile/${from_user}`,
        comment,
        post,
      });

      await newNotifications.save();

      res.json({ success: true, notification: newNotifications });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new notificationsControllers();

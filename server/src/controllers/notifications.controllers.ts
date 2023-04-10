import { Request, Response } from "express";
import { createNotificationFormValue } from "../types";
import notificationsModels from "../models/notifications.models";
import followModels from "../models/follow.models";

class notificationsControllers {
  async createNotification(req: Request, res: Response) {
    const { comment, message, post, url, user } =
      req.body as createNotificationFormValue;
    const from_user = req.body._id;

    if (!message || !url) {
      return res
        .status(400)
        .json({ success: false, message: "Missing paramerter!" });
    }

    try {
      const followers =
        user?.length > 0
          ? user
          : (await followModels.find({ user_follow: from_user })).map(
              (item) => item.user
            );

      const newNotify = new notificationsModels({
        from_user,
        user: followers,
        message,
        url,
        comment,
        post,
      });

      await newNotify.save();

      const notify = await notificationsModels
        .findOne({ _id: newNotify._id })
        .populate({
          path: "from_user",
          select: "_id username fullname avatar",
        });

      res.json({
        success: true,
        notification: notify,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async getNotification(req: Request, res: Response) {
    const user_id = req.body._id;

    try {
      const notifications = await notificationsModels
        .find({
          user: user_id,
        })
        .populate({
          path: "from_user",
          select: "_id username fullname avatar",
        })
        .sort("-createdAt");

      res.json({ success: true, notifications });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async updateStatusSeen(req: Request, res: Response) {
    const user_id = req.body._id;

    try {
      await notificationsModels.updateMany({ user: user_id }, { read: true });

      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new notificationsControllers();

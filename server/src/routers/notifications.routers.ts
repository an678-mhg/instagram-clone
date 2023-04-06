import { Router } from "express";
import notificationsControllers from "../controllers/notifications.controllers";
import verifyToken from "../middlewares/verifyToken";

const routers = Router();

// private
// description: create notification
// /api/notifications/create
routers.post(
  "/create",
  verifyToken,
  notificationsControllers.createNotification
);

export default routers;

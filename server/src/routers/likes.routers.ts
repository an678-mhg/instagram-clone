import { Router } from "express";
import likesControllers from "../controllers/likes.controllers";
import verifyToken from "../middlewares/verifyToken";

const routers = Router();

// private
// description: like posts
// /api/reaction/like
routers.post("/like", verifyToken, likesControllers.like);

export default routers;

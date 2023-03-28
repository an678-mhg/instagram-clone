import { Router } from "express";
import likesControllers from "../controllers/likes.controllers";
import verifyToken from "../middlewares/verifyToken";

const routers = Router();

// private
// description: like posts
// /api/reaction/like
routers.post("/like", verifyToken, likesControllers.likePost);

// private
// description: like comment
// /api/reaction/like-comment
routers.post("/like-comment", verifyToken, likesControllers.likeComment);

export default routers;

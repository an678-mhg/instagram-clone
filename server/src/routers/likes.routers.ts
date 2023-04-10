import { Router } from "express";
import likesControllers from "../controllers/likes.controllers";
import verifyToken from "../middlewares/verifyToken";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

const routers = Router();

routers.use(limiter);

// private
// description: like posts
// /api/reaction/like
routers.post("/like", verifyToken, likesControllers.likePost);

// private
// description: like comment
// /api/reaction/like-comment
routers.post("/like-comment", verifyToken, likesControllers.likeComment);

export default routers;

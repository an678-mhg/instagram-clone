import { Router } from "express";
import commentsControllers from "../controllers/comments.controllers";
import verifyToken from "../middlewares/verifyToken";

const routers = Router();

// private
// description: create comment
// /api/comment/create
routers.post("/create", verifyToken, commentsControllers.addComment);

export default routers;

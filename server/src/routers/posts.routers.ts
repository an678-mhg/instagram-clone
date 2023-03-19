import { Router } from "express";
import postsControllers from "../controllers/posts.controllers";
import verifyToken from "../middlewares/verifyToken";

const routers = Router();

// private
// description: add posts
// /api/posts/create
routers.post("/create", verifyToken, postsControllers.addPost);

// private
// description: get posts
// /api/posts/gets
routers.get("/gets", postsControllers.getPosts);

export default routers;

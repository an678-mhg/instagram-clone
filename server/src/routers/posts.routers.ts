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
routers.get("/gets", verifyToken, postsControllers.getPosts);

// public
// description: get post by id
// /api/posts/get/:_id
routers.get("/get/:_id", postsControllers.getPost);

// public
// desciption: get comment by post_id
// /api/posts/comment/gets/:post_id
routers.get("/comment/gets/:post_id", postsControllers.getComment);

// private
// description: create new comment
// /api/posts/comment/create
routers.post("/comment/create", verifyToken, postsControllers.createComment);

// private
// description: create reply comment
// /api/post/reply-comment/create
routers.post(
  "/reply-comment/create",
  verifyToken,
  postsControllers.replyComment
);

// private
// description: remove post by id
// /api/posts/remove
routers.post("/remove", verifyToken, postsControllers.removePost);

// private
// description: edit post by id
// /api/posts/edit
routers.post("/edit", verifyToken, postsControllers.editPost);

export default routers;

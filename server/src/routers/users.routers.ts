import { Router } from "express";
import usersControllers from "../controllers/users.controllers";
import verifyToken from "../middlewares/verifyToken";

const routers = Router();

// public
// description: get user info by _id
// /api/users/get/:_id
routers.get("/get/:_id", usersControllers.getInfo);

// public
// description: get post by _id
// /api/users/get/posts/:id
routers.get("/get/posts/:_id", usersControllers.getMyPost);

// private
// description: update profile user
// /api/users/edit-profile
routers.put("/edit-profile", verifyToken, usersControllers.changeProfile);

export default routers;

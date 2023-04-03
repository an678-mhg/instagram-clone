import { Router } from "express";
import usersControllers from "../controllers/users.controllers";

const routers = Router();

// public
// description: get user info by _id
// /api/users/:_id
routers.get("/get/:_id", usersControllers.getInfo);

// public
// description: get post by _id
routers.get("/get/posts/:_id", usersControllers.getMyPost);

export default routers;

import { Router } from "express";
import followControllers from "../controllers/follow.controllers";
import verifyToken from "../middlewares/verifyToken";
// import verifyToken from "../middlewares/verifyToken";

const routers = Router();

// public
// description: get suggest account
// /api/follow/suggest-account
routers.get("/suggest-account", followControllers.getSuggestAccount);

// private
// description: follow user
// /api/follow/user
routers.post("/user", verifyToken, followControllers.followUser);

export default routers;

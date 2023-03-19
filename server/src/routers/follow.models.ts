import { Router } from "express";
import followControllers from "../controllers/follow.controllers";
// import verifyToken from "../middlewares/verifyToken";

const routers = Router();

// private
// description: get suggest account
// /api/follow/suggest-account
routers.get("/suggest-account", followControllers.getSuggestAccount);

export default routers;

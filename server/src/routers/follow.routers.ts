import { Router } from "express";
import followControllers from "../controllers/follow.controllers";
import verifyToken from "../middlewares/verifyToken";
import rateLimit from "express-rate-limit";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
});

const routers = Router();

// public
// description: get suggest account
// /api/follow/suggest-account
routers.get("/suggest-account", followControllers.getSuggestAccount);

routers.use(limiter);

// private
// description: follow user
// /api/follow/user
routers.post("/user", verifyToken, followControllers.followUser);

export default routers;

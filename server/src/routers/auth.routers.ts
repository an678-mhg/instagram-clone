import { Router } from "express";
import authControllers from "../controllers/auth.controllers";

const routers = Router();

// public
// description: sign in
// /api/auth/signin
routers.post("/signin", authControllers.signIn);

// public
// description: sign up
// /api/auth/signup
routers.post("/signup", authControllers.signUp);

// private
// description: active account
// /api/auth/active/:activeToken
routers.get("/active/:activeToken", authControllers.activeAccount);

export default routers;

import { Router } from "express";
import authControllers from "../controllers/auth.controllers";
import verifyToken from "../middlewares/verifyToken";

const routers = Router();

// public
// description: sign in
// /api/auth/signin
routers.post("/signin", authControllers.signIn);

// public
// description: sign up
// /api/auth/signup
routers.post("/signup", authControllers.signUp);

// public
// description: active account
// /api/auth/active/:activeToken
routers.get("/active/:activeToken", authControllers.activeAccount);

// public
// description: refresh token
// /api/auth/refreshToken
routers.post("/refreshToken", authControllers.refreshToken);

// public
// description: log out
// /api/auth/logout
routers.post("/logout", authControllers.logout);

// private
// description: get user info
// /api/auth/me
routers.get("/me", verifyToken, authControllers.getMe);

// public
// description: google login
// /api/auth/google
routers.post("/google", authControllers.googleLogin);

export default routers;

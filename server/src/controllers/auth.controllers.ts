import { Request, Response } from "express";
import usersModels from "../models/users.models";
import {
  googleLoginBody,
  refreshTokenBody,
  signInBody,
  signUpBody,
} from "../types";
import { verify, hash } from "argon2";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail";
import {
  generateAccessToken,
  generateActiveToken,
  generateRefreshToken,
} from "../utils/token";
import getRandomColor from "../utils/randomColor";
import { auth } from "../config/firebase";

class authControllers {
  async signIn(req: Request, res: Response) {
    try {
      const { email, password } = req.body as signInBody;

      if (!email || !password) {
        return res
          .status(400)
          .json({ success: false, message: "Missing input parameters!" });
      }

      const user = await usersModels.findOne({ email });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Email or password is wrong!" });
      }

      if (!user.active) {
        return res
          .status(401)
          .json({ success: false, message: "Account is not active!" });
      }

      const verifyPassword = await verify(user.password, password);

      if (!verifyPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Email or password is wrong!" });
      }

      const accessToken = generateAccessToken({ _id: user._id });
      const refreshToken = generateRefreshToken({ _id: user._id });

      user.refreshToken = refreshToken;
      await user.save();

      const {
        password: ps,
        activeToken,
        refreshToken: rfToken,
        ...userData
      } = user.toObject();

      res.json({
        success: true,
        message: "Sign in success!",
        user: userData,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async signUp(req: Request, res: Response) {
    try {
      const { email, fullname, password, username } = req.body as signUpBody;

      if (!email || !fullname || !password || !username) {
        return res
          .status(400)
          .json({ success: false, message: "Missing input parameters!" });
      }

      const user = await usersModels.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ success: false, message: "Email is exist!" });
      }

      const hashPassword = await hash(password);
      const avatar = `https://ui-avatars.com/api/?name=${username}&background=${getRandomColor()}&color=fff`;

      const newUser = new usersModels({
        email,
        username,
        fullname,
        password: hashPassword,
        avatar,
      });

      const activeToken = generateActiveToken({ _id: newUser._id });

      newUser.activeToken = activeToken;

      await newUser.save();

      const html = `
        <h1>Welcome to Instagram-Clone by an678-mhg</h1>
        <p>To continue activating your account, please <a href="${process.env.FRONT_END_URL}/active?activeToken=${activeToken}">click here</a></p>
      `;

      const result = await sendMail(email, html);

      const {
        password: ps,
        activeToken: acToken,
        ...userData
      } = newUser.toObject();

      res.json({
        success: true,
        message: "Sign up success! please check the email",
        user: userData,
        result,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async activeAccount(req: Request, res: Response) {
    try {
      const { activeToken } = req.params;

      if (!activeToken) {
        return res
          .status(401)
          .json({ success: false, message: "Missing active token!" });
      }

      // @ts-ignore
      const decoded = jwt.decode(
        activeToken,
        // @ts-ignore
        process.env.ACTIVE_JWT_SECRET as string
      ) as { _id: string };

      if (!decoded) {
        return res
          .status(401)
          .json({ success: false, message: "Active token is not valid!" });
      }

      const user = await usersModels.findOne({ _id: decoded._id });

      if (user?.activeToken !== activeToken) {
        return res
          .status(401)
          .json({ success: false, message: "Active token is not valid!" });
      }

      const accessToken = generateAccessToken({ _id: user._id });
      const refreshToken = generateRefreshToken({ _id: user._id });

      user.active = true;
      user.activeToken = "";
      user.refreshToken = refreshToken;

      await user.save();

      const {
        password,
        refreshToken: rfToken,
        activeToken: acToken,
        ...userData
      } = user.toObject();

      res.json({
        success: true,
        message: "Active account success!",
        user: userData,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async refreshToken(req: Request, res: Response) {
    try {
      const { refreshToken } = req.body as refreshTokenBody;

      if (!refreshToken) {
        return res
          .status(401)
          .json({ success: false, message: "Missing refresh token!" });
      }

      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_JWT_SECRET as string
      ) as { _id: string };

      if (!decoded) {
        return res
          .status(401)
          .json({ success: false, message: "Refresh token is not valid!" });
      }

      const user = await usersModels.findOne({ _id: decoded._id });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Refresh token is not valid!" });
      }

      if (user.refreshToken !== refreshToken) {
        return res
          .status(401)
          .json({ success: false, message: "Refresh token is not valid!" });
      }

      const accessToken = generateAccessToken({ _id: user._id });
      const newRefreshToken = generateRefreshToken({ _id: user._id });

      user.refreshToken = newRefreshToken;
      await user.save();

      res.json({
        succsess: true,
        message: "Refresh token success!",
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async logout(req: Request, res: Response) {
    const { refreshToken } = req.body as refreshTokenBody;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "Missing refresh token!" });
    }

    try {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_JWT_SECRET as string
      ) as { _id: string };

      if (!decoded) {
        return res
          .status(401)
          .json({ success: false, message: "Refresh token is not valid!" });
      }

      const user = await usersModels.findOne({ _id: decoded._id });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Refresh token is not valid!" });
      }

      if (user.refreshToken !== refreshToken) {
        return res
          .status(401)
          .json({ success: false, message: "Refresh token is not valid!" });
      }

      user.refreshToken = "";
      await user.save();

      res.json({ success: true, message: "Log out success!" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async getMe(req: Request, res: Response) {
    try {
      const _id = req.body._id;

      const user = await usersModels
        .findOne({ _id })
        .select("-password -refreshToken -activeToken");

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "User not found!" });
      }

      res.json({ success: true, user });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async googleLogin(req: Request, res: Response) {
    try {
      const { idTokens } = req.body as googleLoginBody;

      if (!idTokens) {
        return res
          .status(401)
          .json({ success: false, message: "Missing idTokens!" });
      }

      const verifyToken = await auth.verifyIdToken(idTokens);

      const user = await usersModels.findOne({ email: verifyToken.email });

      if (user) {
        const accessToken = generateAccessToken({ _id: user._id });
        const refreshToken = generateRefreshToken({ _id: user._id });

        user.active = true;
        user.refreshToken = refreshToken;
        await user.save();

        const {
          password,
          refreshToken: rfToken,
          activeToken,
          ...userData
        } = user.toObject();

        return res.json({
          success: true,
          message: "Sign in success!",
          user: userData,
          accessToken,
          refreshToken,
        });
      }

      const newUser = new usersModels({
        active: true,
        avatar: verifyToken?.picture as string,
        email: verifyToken?.email as string,
        password: "",
        fullname: verifyToken?.email?.split("@")[0],
        username: verifyToken?.email?.split("@")[0],
        provider: "Google",
      });

      const accessToken = generateAccessToken({ _id: newUser._id });
      const refreshToken = generateRefreshToken({ _id: newUser._id });

      newUser.refreshToken = refreshToken;
      await newUser.save();

      const {
        password,
        refreshToken: rfToken,
        activeToken,
        ...userData
      } = newUser.toObject();

      res.json({
        success: true,
        message: "Sign in success!",
        user: userData,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new authControllers();

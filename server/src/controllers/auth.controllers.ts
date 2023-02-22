import { Request, Response } from "express";
import usersModels from "../models/users.models";
import { signInBody, signUpBody } from "../types";
import { verify, hash } from "argon2";
import jwt from "jsonwebtoken";
import sendMail from "../utils/sendMail";

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

      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        message: "Sign in success!",
        user,
        accessToken,
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
      const avatar = `https://ui-avatars.com/api/?name=${fullname}&background=random`;

      const newUser = new usersModels({
        email,
        username,
        fullname,
        password: hashPassword,
        avatar,
      });

      const activeToken = jwt.sign(
        { _id: newUser._id },
        process.env.ACTIVE_JWT_SECRET as string
      );

      newUser.activeToken = activeToken;

      await newUser.save();

      const html = `
        <h1>Welcome to Instagram-Clone by an678-mhg</h1>
        <p>To continue activating your account, please <a href="${process.env.FRONT_END_URL}/api/auth/active/${activeToken}">click here</a></p>
      `;

      const result = await sendMail(email, html);

      res.json({
        success: true,
        message: "Sign up success!",
        user: newUser,
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

      const decoded = jwt.decode(activeToken) as { _id: string };

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

      user.active = true;
      user.activeToken = "";

      await user.save();

      res.json({ success: true, message: "Active account success!" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new authControllers();

import { Request, Response } from "express";
import likesModels from "../models/likes.models";
import { likeCommentBody, likePostBody } from "../types";

class likesController {
  async likePost(req: Request, res: Response) {
    const { post_id } = req.body as likePostBody;
    const user_id = req.body._id;

    if (!post_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing parameter!" });
    }

    try {
      const existLike = await likesModels.findOne({
        user: user_id,
        post: post_id,
      });

      if (!existLike) {
        await new likesModels({
          user: user_id,
          post: post_id,
        }).save();
      } else {
        await likesModels.findOneAndDelete({ _id: existLike._id });
      }

      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async likeComment(req: Request, res: Response) {
    const { comment_id } = req.body as likeCommentBody;
    const user_id = req.body._id;

    if (!comment_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing parameter!" });
    }

    try {
      const existLike = await likesModels.findOne({
        user: user_id,
        comment: comment_id,
      });

      if (!existLike) {
        await new likesModels({
          user: user_id,
          comment: comment_id,
        }).save();
      } else {
        await likesModels.findOneAndDelete({ _id: existLike._id });
      }

      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new likesController();

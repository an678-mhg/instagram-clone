import { Request, Response } from "express";
import commentsModels from "../models/comments.models";
import { addCommentBody } from "../types";

class commentsController {
  async addComment(req: Request, res: Response) {
    const { comment, post_id } = req.body as addCommentBody;
    const user_id = req.body._id;

    if (!comment || !post_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing parameter!" });
    }

    try {
      const comments = new commentsModels({
        comment,
        post: post_id,
        user: user_id,
      });

      await comments.save();

      res.json({ success: true, comment: comments });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new commentsController();

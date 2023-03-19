import { Request, Response } from "express";
import postsModels from "../models/posts.models";
import { addPostBody } from "../types";
import checkAuth from "../utils/checkAuth";

class postControllers {
  async addPost(req: Request, res: Response) {
    const { caption, media, post_type, user_id } = req.body as addPostBody;

    if (media?.length === 0 || !caption) {
      return res.status(400).json({
        success: false,
        message: "A caption or photo is required!",
      });
    }

    try {
      const newPost = new postsModels({
        caption,
        media,
        user: user_id,
        post_type,
      });

      await newPost.save();

      res.json({ suceess: true, post: newPost });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async getPosts(req: Request, res: Response) {
    const limit = Number(req.query?.limit) || 5;
    const skip = Number(req.query?.skip) || 0;

    const user_id = checkAuth(req.header("Authorization") as string);

    try {
      const posts = await postsModels.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        { $unwind: "$user" },
        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "post",
            as: "likes",
          },
        },
        { $addFields: { like_count: { $size: "$likes" } } },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "post",
            as: "comments",
          },
        },
        { $addFields: { comment_count: { $size: "$comments" } } },
        {
          $project: {
            _id: 1,
            caption: 1,
            media: 1,
            user: {
              _id: 1,
              fullname: 1,
              username: 1,
              avatar: 1,
            },
            like_count: 1,
            comment_count: 1,
            createdAt: 1,
            updatedAt: 1,
            is_liked: { $in: [user_id, "$likes.user"] },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
      ]);

      res.json({ success: true, posts });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new postControllers();

import { Request, Response } from "express";
import mongoose from "mongoose";
import followModels from "../models/follow.models";
import likesModels from "../models/likes.models";
import postsModels from "../models/posts.models";
import { addPostBody } from "../types";

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
    const type = String(req.query.type) || "feed";
    let likes: any[] = [];
    const user_id = req.body._id;

    try {
      const followUser = await followModels.find({ user: user_id });

      const query =
        type === "feed"
          ? {
              $in: [
                ...followUser?.map((item) => item.user_follow),
                new mongoose.Types.ObjectId(user_id),
              ],
            }
          : {
              $nin: [
                ...followUser?.map((item) => item.user_follow),
                new mongoose.Types.ObjectId(user_id),
              ],
            };

      const posts = await postsModels.aggregate([
        {
          $match: {
            user: query,
          },
        },
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

      if (user_id) {
        likes = await likesModels.find({
          post: { $in: posts?.map((post) => post._id) },
          user: user_id,
        });
      }

      res.json({
        success: true,
        posts: posts?.map((post) => ({
          ...post,
          is_liked: likes?.some(
            (like) => post._id?.toString() === like.post?.toString()
          ),
        })),
        hashNextPage: posts?.length >= limit ? true : false,
        nextSkip: posts?.length >= limit ? limit + skip : null,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new postControllers();

import { Request, Response } from "express";
import usersModels from "../models/users.models";
import mongoose from "mongoose";
import likesModels from "../models/likes.models";
import postsModels from "../models/posts.models";
import checkAuth from "../utils/checkAuth";
import { changeProfileFormValue } from "../types";
import followModels from "../models/follow.models";

class usersControllers {
  async getInfo(req: Request, res: Response) {
    const user_id = req.params._id;
    const my_id = checkAuth(req.header("Authorization") as string);
    let is_follow = false;

    if (!user_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing parameter user_id!" });
    }

    try {
      const user = await usersModels.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(user_id),
          },
        },
        {
          $lookup: {
            from: "posts",
            localField: "_id",
            foreignField: "user",
            as: "posts",
          },
        },
        {
          $addFields: { post_count: { $size: "$posts" } },
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "user_follow",
            as: "followers",
          },
        },
        {
          $addFields: { followers_count: { $size: "$followers" } },
        },
        {
          $lookup: {
            from: "follows",
            localField: "_id",
            foreignField: "user",
            as: "following",
          },
        },
        {
          $addFields: { following_count: { $size: "$following" } },
        },
        {
          $project: {
            _id: 1,
            avatar: 1,
            username: 1,
            fullname: 1,
            following_count: 1,
            followers_count: 1,
            post_count: 1,
            website: 1,
            bio: 1,
            email: 1,
            active: 1,
          },
        },
      ]);

      is_follow = Boolean(
        await followModels.findOne({ user: my_id, user_follow: user_id })
      );

      res.json({
        success: user?.[0] ? true : false,
        user: { ...user?.[0], is_follow },
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async getMyPost(req: Request, res: Response) {
    let likes: any[] = [];
    const user_id = checkAuth(req.header("Authorization") as string);
    const user_post = req.params._id;
    const limit = Number(req.query.limit) || 6;
    const skip = Number(req.query.skip) || 0;

    try {
      const posts = await postsModels.aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(user_post),
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
        { $skip: skip },
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
  async changeProfile(req: Request, res: Response) {
    const { bio, fullname, phone, username, website, avatar } =
      req.body as changeProfileFormValue;
    const user_id = req.body._id;

    if (!bio || !fullname || !phone || !username || !website) {
      return res
        .status(400)
        .json({ success: false, message: "Missing parameter!" });
    }

    try {
      const updatedUser = await usersModels.findOneAndUpdate(
        { _id: user_id },
        {
          bio,
          fullname,
          username,
          phone,
          website,
          avatar,
        }
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ success: false, message: "Update user failed!" });
      }

      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async searchUsers(req: Request, res: Response) {
    try {
      const searchText = req.query?.searchText as string;
      const textReg = new RegExp(searchText, "i");

      if (!searchText) {
        return res
          .status(400)
          .json({ success: false, message: "Missing parameters!" });
      }

      const results = await usersModels
        .find({
          $or: [
            {
              username: textReg,
            },
            {
              fullname: textReg,
            },
            {
              bio: textReg,
            },
          ],
        })
        .select("-password -activeToken -refreshToken");

      res.json({ success: true, users: results });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new usersControllers();

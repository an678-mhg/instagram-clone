import { Request, Response } from "express";
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

    try {
      const posts = await postsModels.aggregate([
        // Join với collection Users để lấy thông tin người đăng post
        {
          $lookup: {
            from: "users",
            localField: "user",
            foreignField: "_id",
            as: "user",
          },
        },
        // Unwind kết quả từ join với Users
        { $unwind: "$user" },
        // Join với collection Likes để đếm số lượng like của mỗi post
        {
          $lookup: {
            from: "likes",
            localField: "_id",
            foreignField: "post",
            as: "likes",
          },
        },
        // Tính toán số lượng like bằng size của mảng likes
        { $addFields: { like_count: { $size: "$likes" } } },
        // Join với collection Comments để đếm số lượng comment của mỗi post
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "post",
            as: "comments",
          },
        },
        // Tính toán số lượng comment bằng size của mảng comments
        { $addFields: { comment_count: { $size: "$comments" } } },
        // Chỉ lấy các trường cần thiết của collection Posts
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

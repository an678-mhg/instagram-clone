import { Request, Response } from "express";
import mongoose from "mongoose";
import commentsModels from "../models/comments.models";
import followModels from "../models/follow.models";
import likesModels from "../models/likes.models";
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
  async getPost(req: Request, res: Response) {
    const _id = req.params._id;
    const user_id = checkAuth(req.header("Authorization") as string);
    let is_liked = false;

    if (!_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing paramerter postId" });
    }

    try {
      const post = await postsModels.aggregate([
        {
          $match: {
            _id: new mongoose.Types.ObjectId(_id),
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
      ]);

      if (user_id) {
        is_liked = Boolean(
          await likesModels.findOne({ user: user_id, post: _id })
        );
      }

      if (post.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Post not found!" });
      }

      res.json({ success: true, post: { ...post[0], is_liked } });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async getComment(req: Request, res: Response) {
    const post_id = req.params.post_id;
    const parent_id = req.query.parent_id;
    let likes: any[] = [];
    const user_id = checkAuth(req.header("Authorization") as string);

    if (!post_id) {
      return res
        .status(400)
        .json({ success: false, message: "Missing paramerter postId" });
    }

    try {
      const comments = await commentsModels.aggregate([
        {
          $match: {
            parent_id: parent_id
              ? new mongoose.Types.ObjectId(String(parent_id))
              : null,
            post: new mongoose.Types.ObjectId(post_id),
          },
        },
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "parent_id",
            as: "replies",
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
            foreignField: "comment",
            as: "likes",
          },
        },
        {
          $addFields: { like_count: { $size: "$likes" } },
        },
        {
          $project: {
            _id: "$_id",
            num_replies: { $size: "$replies" },
            comment: 1,
            user: {
              _id: 1,
              fullname: 1,
              username: 1,
              avatar: 1,
            },
            createdAt: 1,
            updatedAt: 1,
            like_count: 1,
            post: 1,
            parent_id: 1,
          },
        },
      ]);

      if (user_id) {
        likes = await likesModels.find({
          user: user_id,
          comment: { $in: comments.map((item) => item._id) },
        });
      }

      res.json({
        comments: comments.map((item) => ({
          ...item,
          is_liked: likes.some(
            (like) => like.comment.toString() === item._id.toString()
          ),
        })),
        success: true,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async createComment(req: Request, res: Response) {
    const { comment, post_id } = req.body as {
      comment: string;
      post_id: string;
    };
    const user_id = req.body._id;

    if (!comment) {
      return res
        .status(400)
        .json({ success: false, message: "Missing paramerter comment text" });
    }

    try {
      const newComment = new commentsModels({
        user: user_id,
        parent_id: null,
        post: post_id,
        comment,
      });

      await newComment.save();

      res.json({ success: true, comment: newComment });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async replyComment(req: Request, res: Response) {
    const { parent_id, comment, post_id } = req.body;
    const user_id = req.body._id;

    try {
      const commentParent = await commentsModels.findOne({ _id: parent_id });

      if (commentParent?.parent_id) {
        return res
          .status(400)
          .json({ success: false, message: "Only support 1 level answer!" });
      }

      await new commentsModels({
        comment,
        parent_id,
        post: post_id,
        user: user_id,
      }).save();

      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new postControllers();

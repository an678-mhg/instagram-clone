import { Request, Response } from "express";
import followModels from "../models/follow.models";
import usersModels from "../models/users.models";
import { followUserBody } from "../types";
import checkAuth from "../utils/checkAuth";

class followControllers {
  async getSuggestAccount(req: Request, res: Response) {
    const user_id = checkAuth(req.header("Authorization") as string);
    let follow: any[] = [];

    try {
      const account = await usersModels.aggregate([
        {
          $lookup: {
            from: "posts",
            localField: "_id",
            foreignField: "user",
            as: "posts",
          },
        },
        {
          $match: {
            "posts.0": { $exists: true },
          },
        },
        {
          $sort: {
            createdAt: -1,
          },
        },
        {
          $project: {
            _id: 1,
            fullname: 1,
            username: 1,
            avatar: 1,
            createdAt: 1,
          },
        },
      ]);

      if (user_id) {
        follow = await followModels.find({
          user: user_id,
          user_follow: account.map((account) => account._id),
        });
      }

      res.json({
        success: true,
        account: account?.map((account) => ({
          ...account,
          is_follow: follow.some(
            (item) => item.user_follow?.toString() === account._id?.toString()
          ),
        })),
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
  async followUser(req: Request, res: Response) {
    const { user_follow } = req.body as followUserBody;
    const user_id = req.body._id;

    try {
      const existFollow = await followModels.findOne({
        user: user_id,
        user_follow,
      });

      if (!existFollow) {
        await new followModels({
          user: user_id,
          user_follow,
        }).save();
      } else {
        await followModels.findOneAndDelete({ _id: existFollow._id });
      }

      res.json({ success: true });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new followControllers();

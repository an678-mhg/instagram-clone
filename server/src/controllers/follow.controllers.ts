import { Request, Response } from "express";
import usersModels from "../models/users.models";

class followControllers {
  async getSuggestAccount(req: Request, res: Response) {
    try {
      const account = await usersModels.aggregate([
        // Lấy các bài post của mỗi tài khoản
        {
          $lookup: {
            from: "posts",
            localField: "_id",
            foreignField: "user",
            as: "posts",
          },
        },
        // Loại bỏ các tài khoản không có bài post
        {
          $match: {
            "posts.0": { $exists: true },
          },
        },
        // Sắp xếp theo bài viết mới nhất
        {
          $sort: {
            createdAt: -1,
          },
        },
        // Chỉ lấy ra các trường thông tin cần thiết
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

      res.json({ success: true, account });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Server not found!", error });
    }
  }
}

export default new followControllers();

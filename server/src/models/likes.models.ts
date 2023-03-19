import mongoose, { Schema } from "mongoose";

const likes = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "comments",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("likes", likes);

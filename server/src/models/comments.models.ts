import mongoose, { Schema } from "mongoose";

const comments = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "posts",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: "comments",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("comments", comments);

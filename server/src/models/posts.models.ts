import mongoose, { Schema } from "mongoose";

const posts = new Schema(
  {
    caption: {
      type: String,
      default: "",
    },
    media: {
      type: Array,
      default: [],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    post_type: {
      type: String,
      enum: ["stories", "posts"],
      default: "posts",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("posts", posts);

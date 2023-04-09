import mongoose, { Schema } from "mongoose";

const notifications = new Schema(
  {
    user: { type: [mongoose.Schema.Types.ObjectId], required: true },
    from_user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    post: { type: mongoose.Schema.Types.ObjectId },
    comment: { type: mongoose.Schema.Types.ObjectId },
    read: { type: Boolean, default: false },
    url: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("notifications", notifications);

import mongoose, { Schema } from "mongoose";

const notifications = new Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    from_user: { type: mongoose.Schema.Types.ObjectId, required: true },
    post: { type: mongoose.Schema.Types.ObjectId },
    comment: { type: mongoose.Schema.Types.ObjectId },
    type: { type: String, enum: ["comment", "like", "follow"], required: true },
    read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("notifications", notifications);

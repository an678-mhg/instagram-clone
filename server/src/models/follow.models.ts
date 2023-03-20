import mongoose, { Schema } from "mongoose";

const follow = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
  user_follow: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

export default mongoose.model("follow", follow);

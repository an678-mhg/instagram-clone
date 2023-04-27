import mongoose, { Schema } from "mongoose";

const conventions = new Schema(
  {
    members: {
      type: [Schema.Types.ObjectId],
      required: true,
    },
    lastMessage: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "messages",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("conventions", conventions);

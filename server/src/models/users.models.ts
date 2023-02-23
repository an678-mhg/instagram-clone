import mongoose, { Schema } from "mongoose";

const users = new Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      default: null,
    },
    active: {
      type: Boolean,
      default: false,
    },
    provider: {
      type: String,
      enum: ["Facebook", "Google", "Email"],
      default: "Email",
    },
    avatar: {
      type: String,
      required: true,
    },
    activeToken: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", users);

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
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

users.index({
  fullname: "text",
  username: "text",
  bio: "text",
  email: "text",
  phone: "text",
});

const usersModels = mongoose.model("users", users);

export default usersModels;

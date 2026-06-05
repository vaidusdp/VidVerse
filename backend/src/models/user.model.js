import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      lowerCase: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowerCase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      lowerCase: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    refreshToken: String,
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model("User", userSchema);

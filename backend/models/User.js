import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // It forces every email to be one-of-a-kind.
    },
    password: {
      type: String,
      required: true, // This will store the hashed password, not the plain text one.
    },
    isAdmin: {
      type: Boolean,
      default: false, // Everyone is a normal customer by default.
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;

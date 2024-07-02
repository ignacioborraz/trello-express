import { Schema, model } from "mongoose";

const collection = "users";

const schema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://static-00.iconduck.com/assets.00/avatar-icon-512x512-gu21ei4u.png",
    },
    age: { type: Number, required: false },
    username: { type: String },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;

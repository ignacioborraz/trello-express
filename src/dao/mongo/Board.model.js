import { Schema, model, Types } from "mongoose";

const collection = "boards";

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    user_id: { type: Types.ObjectId, ref: "users", required: true },
  },
  { timestamps: true }
);

const Board = model(collection, schema);
export default Board;

import { Schema, model } from "mongoose";

const collection = "boards";

const schema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
);

const Board = model(collection, schema);
export default Board;

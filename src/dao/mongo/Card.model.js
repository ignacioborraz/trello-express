import { Schema, model } from "mongoose";

const collection = "cards";

const schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    list_id: { type: String, required: true },
    user_id: { type: String, required: true },
  },
  { timestamps: true }
);

const Board = model(collection, schema);
export default Board;

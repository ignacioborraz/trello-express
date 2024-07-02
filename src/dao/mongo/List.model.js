import { Schema, model } from "mongoose";

const collection = "lists";

const schema = new Schema(
  {
    name: { type: String, required: true },
    board_id: { type: String, required: true },
  },
  { timestamps: true }
);

const List = model(collection, schema);
export default List;

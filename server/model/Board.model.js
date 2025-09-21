import mongoose, { Schema, model } from "mongoose";

const Board = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
});

const BoardModel = model("Board", Board);

export default BoardModel;

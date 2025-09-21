import mongoose from "mongoose";

const Board = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  tasks: {
    type: Schema.Types.ObjectId,
    ref: "Task",
  },
});

const BoardModel = mongoose.model("Board", Board);

export { BoardModel };

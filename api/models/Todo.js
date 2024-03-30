const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    todos: [
      {
        todo: {
          type: String,
        },
        isFinished: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", TodoSchema);
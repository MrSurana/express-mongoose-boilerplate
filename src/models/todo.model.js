const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret, options) => {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;

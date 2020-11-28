const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    text: { type: String, required: true }
}, {
    timestamps: true
});

const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
const Todo = require('../models/todo.model');

class TodoRepository {
    static async list() {
        const todos = await Todo.find();
        return todos;
    }

    static async create({ text }) {
        const todo = await Todo.create({ text });
        return todo;
    }

    static async getById(id) {
        const todo = await Todo.findById(id);
        return todo;
    }

    static async update(id, { text }) {
        const todo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
        return todo;
    }

    static async delete(id) {
        const todo = await Todo.findByIdAndDelete(id);
        return todo;
    }
}

module.exports = TodoRepository;
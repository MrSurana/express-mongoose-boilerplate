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
}

module.exports = TodoRepository;
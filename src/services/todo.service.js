const TodoRepository = require('../repositories/todo.repository');

class TodoService {
    static async list() {
        const todos = await TodoRepository.list();
        return todos;
    }

    static async create(data) {
        const { text } = data;

        if (!text) throw new Error("'text' field is required");

        const todo = await TodoRepository.create({ text });
        return todo;
    }
}

module.exports = TodoService;
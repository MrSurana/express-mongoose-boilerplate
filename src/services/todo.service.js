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

    static async getById(id) {
        const todo = await TodoRepository.getById(id);
        return todo;
    }

    static async update(id, data) {
        const { text } = data;

        if (!text) throw new Error("'text' field is required");

        const todo = await TodoRepository.update(id, { text });
        return todo;
    }

    static async delete(id) {
        const todo = await TodoRepository.delete(id);
        return todo;
    }
}

module.exports = TodoService;
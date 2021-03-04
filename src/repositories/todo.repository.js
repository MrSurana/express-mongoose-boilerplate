const Todo = require('../models/todo.model');

const TodoRepository = {};

/**
 * Get a list of all todos
 */
TodoRepository.getAll = async () => {
    const todos = await Todo.find();
    return todos;
}

/**
 * Create a new todo
 * 
 * @param {{text: string}} data - Todo record data
 */
TodoRepository.create = async ({ text }) => {
    const todo = await Todo.create({ text });
    return todo;
}

/**
 * Get a todo by id
 * 
 * @param {string} id - Todo record id
 */
TodoRepository.getById = async (id) => {
    const todo = await Todo.findById(id);
    return todo;
}

/**
 * Update a todo by given id
 * 
 * @param {string} id - Todo record id
 * @param {{text: string}} data - Todo record data
 */
TodoRepository.update = async (id, { text }) => {
    const todo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
    return todo;
}

/**
 * Delete a todo by given id
 * 
 * @param {string} id - Todo record id
 */
TodoRepository.delete = async (id) => {
    const todo = await Todo.findByIdAndDelete(id);
    return todo;
}

module.exports = TodoRepository;
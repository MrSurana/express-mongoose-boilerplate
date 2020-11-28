const express = require('express');
const TodoRepository = require('../repositories/todo.repository');

class TodoController {
    /**
     * Get a list of todos
     * @param {express.Request} req Express router request object
     * @param {express.Response} res Express router response object
     * @param {express.NextFunction} next Express router next function
     */
    static async index(req, res, next) {
        try {
            const todos = await TodoRepository.list();
            res.status(200).json(todos);
        } catch (err) {
            res.status(400).send(`Error: ${err.message}`);
        }
    }

    /**
     * Create a new todo
     * @param {express.Request} req Express router request object
     * @param {express.Response} res Express router response object
     * @param {express.NextFunction} next Express router next function
     */
    static async create(req, res, next) {
        const { text } = req.body;

        if (!text) return res.status(400).send("'text' field is required");

        try {
            const todo = await TodoRepository.create({ text });
            res.status(200).json(todo);
        } catch (err) {
            res.status(400).send(`Error: ${err.message}`);
        }
    }
}

module.exports = TodoController;
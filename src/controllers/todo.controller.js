const express = require('express');
const TodoRepository = require('../repositories/todo.repository');

class TodoController {

    /**
     * List all todos
     * @param {express.Request} req - Express router request object
     * @param {express.Response} res - Express router response object
     * @param {express.NextFunction} next - Express router next function
     */
    static async index(req, res, next) {
        try {
            const todos = await TodoRepository.getAll();
            res.status(200).json(todos);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Create a new todo
     * @param {express.Request} req - Express router request object
     * @param {express.Response} res - Express router response object
     * @param {express.NextFunction} next - Express router next function
     */
    static async create(req, res, next) {
        const { text } = req.body;

        if (!text) throw new Error("'text' field is required");

        try {
            const todo = await TodoRepository.create({ text });
            res.status(200).json(todo);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Show todo by id
     * @param {express.Request} req - Express router request object
     * @param {express.Response} res - Express router response object
     * @param {express.NextFunction} next - Express router next function
     */
    static async show(req, res, next) {
        const { id } = req.params;

        try {
            const todo = await TodoRepository.getById(id);
            if (!todo) throw new Error("Todo not found!");

            res.status(200).json(todo);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Update todo by id
     * @param {express.Request} req - Express router request object
     * @param {express.Response} res - Express router response object
     * @param {express.NextFunction} next - Express router next function
     */
    static async update(req, res, next) {
        const { id } = req.params;
        const { text } = req.body;

        if (!text) throw new Error("'text' field is required");

        try {
            const todo = await TodoRepository.update(id, { text });
            if (!todo) throw new Error("Todo not found!");

            res.status(200).json(todo);
        } catch (err) {
            next(err);
        }
    }

    /**
     * Delete todo by id
     * @param {express.Request} req - Express router request object
     * @param {express.Response} res - Express router response object
     * @param {express.NextFunction} next - Express router next function
     */
    static async delete(req, res, next) {
        const { id } = req.params;

        try {
            const todo = await TodoRepository.delete(id);
            if (!todo) throw new Error("Todo not found!");

            res.status(200).json(todo);
        } catch (err) {
            next(err);
        }
    }
}

module.exports = TodoController;
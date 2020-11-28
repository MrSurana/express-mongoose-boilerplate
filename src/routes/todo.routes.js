const express = require('express');
const router = express.Router();

const TodoService = require('../services/todo.service');

/**
 * List all todos
 */
router.get("/", async (req, res, next) => {
    try {
        const todos = await TodoService.list();
        res.status(200).json(todos);
    } catch (err) {
        next(err);
    }
});

/**
 * Create a new todo
 */
router.post("/", async (req, res, next) => {
    const { text } = req.body;

    try {
        const todo = await TodoService.create({ text });
        res.status(200).json(todo);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
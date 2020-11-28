const express = require('express');
const Todo = require('../models/todo.model');

/**
 * Get a list of todos
 * @param {express.Request} req Express router request object
 * @param {express.Response} res Express router response object
 * @param {express.NextFunction} next Express router next function
 */
exports.index = async (req, res, next) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }

};

/**
 * Create a new todo
 * @param {express.Request} req Express router request object
 * @param {express.Response} res Express router response object
 * @param {express.NextFunction} next Express router next function
 */
exports.create = async (req, res, next) => {
    const { text } = req.body;

    if (!text) return res.status(400).send("'text' field is required");

    try {
        const todo = await Todo.create({ text });
        res.status(200).json(todo);
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
};
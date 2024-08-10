const express = require("express");
const Todo = require("../models/todo.model");

const TodoController = {};

/**
 * List all todos
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 * @param {express.NextFunction} next - Express router next function
 */
TodoController.index = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

/**
 * Create a new todo
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 * @param {express.NextFunction} next - Express router next function
 */
TodoController.create = async (req, res, next) => {
  const { text } = req.body;

  try {
    if (!text) throw new Error("'text' field is required");

    const todo = await Todo.create({ text });
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

/**
 * Show todo by id
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 * @param {express.NextFunction} next - Express router next function
 */
TodoController.show = async (req, res, next) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) throw new Error("Todo not found!");

    res.status(200).json(todo);
  } catch (err) {
    if (err.name == "CastError") {
      err.message = "'id' param is an invalid todo id";
    }

    next(err);
  }
};

/**
 * Update todo by id
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 * @param {express.NextFunction} next - Express router next function
 */
TodoController.update = async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) throw new Error("'text' field is required");

  try {
    const todo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
    if (!todo) throw new Error("Todo not found!");

    res.status(200).json(todo);
  } catch (err) {
    if (err.name == "CastError") {
      err.message = "'id' param is an invalid todo id";
    }

    next(err);
  }
};

/**
 * Delete todo by id
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 * @param {express.NextFunction} next - Express router next function
 */
TodoController.delete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) throw new Error("Todo not found!");

    res.status(200).json(todo);
  } catch (err) {
    if (err.name == "CastError") {
      err.message = "'id' param is an invalid todo id";
    }

    next(err);
  }
};

module.exports = TodoController;

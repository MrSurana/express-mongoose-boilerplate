const express = require("express");
const Todo = require("../models/todo.model");

const TodoController = {};

/**
 * List all todos
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 */
TodoController.index = async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
};

/**
 * Create a new todo
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 */
TodoController.create = async (req, res) => {
  const { text } = req.body;

  if (!text) throw new Error("'text' field is required");

  const todo = await Todo.create({ text });
  res.status(200).json(todo);
};

/**
 * Show todo by id
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 */
TodoController.show = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findById(id);
  if (!todo) throw new Error("Todo not found!");

  res.status(200).json(todo);
};

/**
 * Update todo by id
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 */
TodoController.update = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text) throw new Error("'text' field is required");

  const todo = await Todo.findByIdAndUpdate(id, { text }, { new: true });
  if (!todo) throw new Error("Todo not found!");

  res.status(200).json(todo);
};

/**
 * Delete todo by id
 *
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 */
TodoController.delete = async (req, res) => {
  const { id } = req.params;

  const todo = await Todo.findByIdAndDelete(id);
  if (!todo) throw new Error("Todo not found!");

  res.status(200).json(todo);
};

module.exports = TodoController;

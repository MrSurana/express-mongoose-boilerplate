const express = require('express');
const todoRouter = express.Router();

const TodoController = require('../controllers/todo.controller');

todoRouter.get("/", TodoController.index);
todoRouter.post("/", TodoController.create);
todoRouter.get("/:id", TodoController.show);
todoRouter.post("/:id", TodoController.update);
todoRouter.delete("/:id", TodoController.delete);

module.exports = todoRouter;
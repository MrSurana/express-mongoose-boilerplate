const express = require('express');
const router = express.Router();

const TodoController = require('../controllers/todo.controller');

router.get("/", TodoController.index);
router.post("/", TodoController.create);

module.exports = router;
const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo.controller');

router.get("/", todoController.index);

module.exports = router;
const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todo.controller');

router.get("/", todoController.index);
router.post("/", todoController.create);

module.exports = router;
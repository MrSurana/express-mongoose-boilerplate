const express = require('express');
const router = express.Router();

const todoRouter = require("./todo.routes");

// Index route
router.get("/", (req, res) => {
    res.send("Hello world!");
})

// API routes
router.use("/todos", todoRouter);

module.exports = router;
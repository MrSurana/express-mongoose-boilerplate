const express = require('express');

/**
 * Get a list of todos
 * @param {express.Request} req Express router request object
 * @param {express.Response} res Express router response object
 * @param {express.NextFunction} next Express router next function
 */
exports.index = (req, res, next) => {
    res.send([{ id: 1, text: "todo works!" }]);
};
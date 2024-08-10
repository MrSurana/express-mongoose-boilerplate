require("dotenv").config();
require("express-async-errors");

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./src/routes");

const app = express();

// Middlewares
/* istanbul ignore if */
if (process.env.NODE_ENV != "test") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);

/**
 * Express error handler
 *
 * @param {Error} err - Javascript error object
 * @param {express.Request} req - Express router request object
 * @param {express.Response} res - Express router response object
 * @param {express.NextFunction} next - Express router next function
 */
const globalErrorHandler = (err, req, res, next) => {
  /* istanbul ignore if */
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  if (err.name == "CastError") {
    err.message = "Invalid param type";
  }

  res.status(400).send(err.message);
};
app.use(globalErrorHandler);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch(/* istanbul ignore next */ (err) => console.error(err));

// Start express server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Express server listening on http://localhost:${process.env.PORT}`
  );
});

module.exports = { app, server, mongoose };

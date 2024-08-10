require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./src/routes");

const app = express();

// Middlewares
if (process.env.NODE_ENV != "test") app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);

// Express error handler
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "development") console.error(err.stack);
  res.status(400).send(err.message);
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error(err));

// Start express server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Express server listening on http://localhost:${process.env.PORT}`
  );
});

module.exports = { app, server, mongoose };

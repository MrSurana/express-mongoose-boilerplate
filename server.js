const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const indexRouter = require("./src/routes");
const config = require("./config");

const app = express();

// Middlewares
if (config.env != "test") app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);

// Express error handler
app.use((err, req, res, next) => {
  if (config.env === "development") console.error(err.stack);
  res.status(400).send(err.message);
});

// MongoDB connection
mongoose
  .connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .catch((err) => null);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error(err.stack);
});

db.once("open", function () {
  console.log("Connected to MongoDB!");
});

// Start express server
app.listen(config.port, () => {
  console.log(`Express server listening on http://localhost:${config.port}`);
});

module.exports = { app };

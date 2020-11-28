require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./src/routes');

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", indexRouter);

// Express error handler
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'development') console.error(err.stack);
    res.status(400).send(err.message);
})


// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}).catch((err) => null);

const db = mongoose.connection;

db.on('error', (err) => {
    console.error(err.stack);
});

db.once('open', function () {
    console.error("Connected to MongoDB!");
});

// Start express server
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Express server listening on http://localhost:${port}`);
});

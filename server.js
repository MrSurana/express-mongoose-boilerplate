const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./src/routes');

// Config
const port = 3000;
const mongoUri = "mongodb://localhost/express_mongoose_boilerplate";

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);

// MongoDB connection
mongoose.connect(mongoUri, {
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
app.listen(port, () => {
    console.log(`Express server listening on http://localhost:${port}`);
});

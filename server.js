const express = require('express');
const morgan = require('morgan');
const indexRouter = require('./src/routes');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use("/", indexRouter);

app.listen(port, () => {
    console.log(`Express server listening on http://localhost:${port}`);
});
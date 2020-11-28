const express = require('express');
const indexRouter = require('./src/routes');

const app = express();
const port = 3000;

app.use("/", indexRouter);

app.listen(port, () => {
    console.log(`Express server listening on http://localhost:${port}`);
});
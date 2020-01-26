'user strict'

const express = require('express');
const app = express();
const port = 8000;

require('./app/src/uploader')(app);


app.listen(port, () => console.log(`Text recognition server listening of port ${port}!`));

module.exports = app;

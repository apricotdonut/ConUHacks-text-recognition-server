'user strict'

const bodyParser = require('body-parser');
const multer = require('multer');
const express = require('express');
const app = express();
const port = 8000;
require('./app/src/uploader')(app);

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
})

app.disable('x-powered-by');
app.use(multerMid.single('file'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((err, req, res, next) => {
    res.status(500).json({
      error: err,
      message: 'Internal server error!',
    });
    next();
});

app.listen(port, () => console.log(`Text recognition server listening of port ${port}!`));

module.exports = app;

'user strict'

const multer = require('multer');
const fileType = require('file-type');
const fs = require('fs');
const { storage } = require('../utils/squery');

const upload = multer({
    dest:'images/', 
    limits: {fileSize: 10000000, files: 1},
    fileFilter:  (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg)$/)) {
            return callback(new Error('Only Images are allowed !'), false);
        }
        callback(null, true);
    }
}).single('image');

module.exports = app => {
    app.get('/test', (req, res) => {
        const bucketName = "reresults";
        storage.bucket(bucketName).getFiles(function(err, files) {
            console.log(files);
            res.status(200).send(JSON.stringify(files));
        });
    });

    app.post('/image_to_text', (req, res) => {
        upload(req, res, (err) => {
            if(err) {
                res.status(400).json({ message: err.message });
            } else {
                const path = ``
            }
        });
    });
}

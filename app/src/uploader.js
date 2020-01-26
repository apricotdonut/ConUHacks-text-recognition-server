'user strict'

const multer = require('multer');
const { storage } = require('../utils/squery');
const bucket = storage.bucket('handy-outpost-266217');

const uploadImage = (file) => new Promise((resolve, reject) => {
    const { originalname, buffer } = file
  
    const blob = bucket.file(originalname.replace(/ /g, "_"))
    const blobStream = blob.createWriteStream({
      resumable: false
    })
    blobStream.on('finish', () => {
      const publicUrl = format(
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      )
      resolve(publicUrl)
    })
    .on('error', () => {
      reject(`Unable to upload image, something went wrong`)
    })
    .end(buffer)
});

module.exports = app => {
    app.get('/test', (req, res) => {
        const bucketName = "reresults";
        storage.bucket(bucketName).getFiles(function(err, files) {
            res.status(200).send(JSON.stringify(files));
        });
    });

    app.post('/image_to_text', async (req, res, next) => {
        try {
            const myFile = req.file
            const imageUrl = await uploadImage(myFile)
            res
              .status(200)
              .json({
                message: "Upload was successful",
                data: imageUrl
              })
          } catch (error) {
            next(error)
          }
    });
}

'user strict'
const {Storage} = require('@google-cloud/storage');

const bucketName = "reresults"
const filename = "meme3.jpg"
const storage = new Storage();

async function uploadFile() {
  // Uploads a local file to the bucket
  await storage.bucket(bucketName).upload(filename, {
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  });

  console.log(`${filename} uploaded to ${bucketName}.`);
}

uploadFile();
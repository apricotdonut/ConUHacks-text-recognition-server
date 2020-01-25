'use strict';

async function quickstart() {
    const vision = require('@google-cloud/vision');

    const client = new vision.ImageAnnotatorClient();

    const fileName = "meme.jpg";

    await client.documentTextDetection(fileName);
}

quickstart()
'use strict';

async function quickstart() {
    const vision = require('@google-cloud/vision');

    const client = new vision.ImageAnnotatorClient();

    const fileName = "meme.jpg";

    const [result] = await client.documentTextDetection(fileName);
    const fullTextAnnotation = result.fullTextAnnotation;
    console.log(fullTextAnnotation.text);
    
}

quickstart()
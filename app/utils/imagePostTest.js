const request = require('request');
const fs = require('fs');

const imageData = {
    data: fs.createReadStream('../../weird.jpg')
}

const test = () => {
    request.post({
        url: 'http://localhost:8000/image_to_text',
        formData: imageData
    }, (err, res, body) => {
        console.log('error: ' + err);
        console.log('res: ' + JSON.stringify(res));
    });
}

test();

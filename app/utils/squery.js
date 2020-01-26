'use strict';
// const { Storage } = require('@google-cloud/storage');
const vision = require('@google-cloud/vision');
const path = require('path');
const request = require('request');

// const storage = new Storage({
//     keyFilename: path.join(__dirname, "../conuhacks_google_cloud.json"),
//     projectId: 'handy-outpost-266217'
// });

const client = new vision.ImageAnnotatorClient();

// const imagefind = async () => {
//     var maxtime = "2020-01-12T13:52:34.375Z";
//     const bucketName = "reresults";
//     var curr_name = "";   
    
//     storage.bucket(bucketName).getFiles(function(err, files) {
//         files.forEach(function (file, index){
//             const len = files.length;
//             file.getMetadata(function (err, metadata){
//                 if (comparetime(metadata.updated, maxtime)){
//                     maxtime = metadata.updated;
//                     curr_name = metadata.name;
//                 }
            
//                 if(index === len - 1) {
//                     console.log(`Calling imgtotext with ${curr_name}`);
//                     imgtotext(curr_name);
//                 }
//             });
//         });
//     });
// }

async function imgToText() {
    try {
        console.log('start');
        const text = await client.documentTextDetection('image.jpg');
        console.log('got text');
        //request.post('http://localhost:9000/', { text: text.fullTextAnnotation.text }); // this should throw error right now cuz there's no Django server on 9000 yet
        console.log('done');
        return text;
    } catch(err) {
        console.log('ERROR in imgToText: ' + err);
    }
}

// function comparetime(x, y){
//     var ymdx = x.substr(0,10);
//     var ymdy = y.substr(0,10);
    
//     var hmsx = x.substr(11,8);
//     var hmsy = y.substr(11,8);
    
//     // YEAR
//     if (ymdx.substr(0,4) > ymdy.substr(0,4)){
//         return true;
//     }else if (ymdx.substr(0,4) < ymdy.substr(0,4)){
//         return false;
//     }
    
//     // MONTH
//     if (ymdx.substr(5,2) > ymdy.substr(5,2)){
//         return true;
//     }else if (ymdx.substr(5,2) < ymdy.substr(5,2)){
//         return false;
//     }
//     // DAY
//     if (ymdx.substr(8,2) > ymdy.substr(8,2)){
//         return true;
//     }else if (ymdx.substr(8,2) < ymdy.substr(8,2)){
//         return false;
//     }

//     // HOUR
//     if (hmsx.substr(0,2) > hmsy.substr(0,2)){
//         return true;
//     }else if (hmsx.substr(0,2) < hmsy.substr(0,2)){
//         return false;
//     }
//     // MIN
//     if (hmsx.substr(3,2) > hmsy.substr(3,2)){
//         return true;
//     }else if (hmsx.substr(3,2) < hmsy.substr(3,2)){
//         return false;
//     }
//     // SECOND
//     if (hmsx.substr(6,2) > hmsy.substr(6,2)){
//         return true;
//     }else if (hmsx.substr(6,2) < hmsy.substr(6,2)){
//         return false;
//     }
// }

// imgToText();

module.exports = imgToText;

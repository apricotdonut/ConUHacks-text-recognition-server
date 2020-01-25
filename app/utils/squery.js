'use strict';
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient();

const imagefind = async () => {
    var maxtime = "2020-01-12T13:52:34.375Z";
    const bucketName = "reresults";
    var curr_name = "";   
    
    storage.bucket(bucketName).getFiles(function(err, files) {
        files.forEach(function (file, index){
            const len = files.length;
            file.getMetadata(function (err, metadata){
                if (comparetime(metadata.updated, maxtime)){
                    maxtime = metadata.updated;
                    curr_name = metadata.name;
                }
            
                if(index === len - 1) imgtotext(curr_name);
            });
        });
    });
}

async function imgtotext(imagename) {
    const bucketName = 'reresults';
    await client.documentTextDetection(
      `gs://${bucketName}/${imagename}`
    );
}

function comparetime(x, y){
    var ymdx = x.substr(0,10);
    var ymdy = y.substr(0,10);
    
    var hmsx = x.substr(11,8);
    var hmsy = y.substr(11,8);
    
    // YEAR
    if (ymdx.substr(0,4) > ymdy.substr(0,4)){
        return true;
    }else if (ymdx.substr(0,4) < ymdy.substr(0,4)){
        return false;
    }
    
    // MONTH
    if (ymdx.substr(5,2) > ymdy.substr(5,2)){
        return true;
    }else if (ymdx.substr(5,2) < ymdy.substr(5,2)){
        return false;
    }
    // DAY
    if (ymdx.substr(8,2) > ymdy.substr(8,2)){
        return true;
    }else if (ymdx.substr(8,2) < ymdy.substr(8,2)){
        return false;
    }

    // HOUR
    if (hmsx.substr(0,2) > hmsy.substr(0,2)){
        return true;
    }else if (hmsx.substr(0,2) < hmsy.substr(0,2)){
        return false;
    }
    // MIN
    if (hmsx.substr(3,2) > hmsy.substr(3,2)){
        return true;
    }else if (hmsx.substr(3,2) < hmsy.substr(3,2)){
        return false;
    }
    // SECOND
    if (hmsx.substr(6,2) > hmsy.substr(6,2)){
        return true;
    }else if (hmsx.substr(6,2) < hmsy.substr(6,2)){
        return false;
    }
}

imagefind();

module.exports = {
    imagefind,
    storage
}

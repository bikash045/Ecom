//require bodyPrser
const bodyParser = require("body-parser")
const urlEncoder = bodyParser.urlencoded({ extended: false });
const jsonEncoder = bodyParser.json();

//require multer
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "public/images");
    },
    filename: (req, file, callback) => {
        callback(null, path.extname(file.originalname))
    }
})
const multipart = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg') {
            callback(null, true)
        }
        else {
           res.send('only jpg & png file supported');
            callback(null,false)
        }
    }
}).array('image', 5);



module.exports = {
    urlEncoder: urlEncoder,
    jsonEncoder: jsonEncoder,
    multipart: multipart
}
















    // fileFilter:function(req,fileInfo,callback){
    //     if(fileInfo.mimetype == 'image/png' || fileInfo.mimetype == 'image/jpeg'){
    //         callback(null,true)
    //     }
    //     else{
    //         console.log('only jpg & png file supported');
    //     }
    // }
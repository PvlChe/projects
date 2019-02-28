const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const uuid = require('uuid');



const s3 = new aws.S3();


exports.upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'meducate1991',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {fieldName: file.fieldname});
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() +'-'+ file.originalname)
        }
    })
});



const imageUploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './data/images')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now())
    }
});

const videoUploadStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './data/videos')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()  + '-' + file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if (
        file.mimeType === 'images/jpg' ||
        file.mimeType === 'images/png' ||
        file.mimeType === 'images/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, true);
    }
};

const videoFileFilter = (req, file, cb) => {
    if (
        file.mimeType === 'videos/mp4'
    ) {
        cb(null, true);
    } else {
        cb(null, true);
    }
}

exports.imageUpload = multer({storage: imageUploadStorage, fileFilter: imageFileFilter});
exports.videoUpload = multer({storage: videoUploadStorage, fileFilter: videoFileFilter});


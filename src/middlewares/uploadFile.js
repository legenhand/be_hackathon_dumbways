// import package here
const multer = require('multer');

exports.uploadFile = () => {
    // Destination and rename
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, 'uploads');
        },
        filename: function(req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, ''));
        },
    });

    // Filter file type
    const fileFilter = (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            // check file type to be png, jpeg, or jpg
            cb(null, true);
        } else {
            cb(null, false); // else fails
        }

    };

    // Maximum File Size
    const size = 10;
    const maxSize = size * 1000 * 1000;
    const limits = {
        fileSize: maxSize,
    };

    const upload = multer({
        storage,
        fileFilter,
        limits,
    }).fields([{
            name: 'coverImage',
            maxCount: 1,
        },
        {
            name: 'screenshots',
            maxCount: 3,
        },
    ]);

    return (req, res, next) => {
        upload(req, res, function(err) {
            // Filter
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }

            // If file empty
            if (!req.files && !err) {
                return res.send({
                    message: 'Please select files to upload!'
                })
            }

            // Limit
            if (err) {
                console.log(err);
                if (err.code == 'LIMIT_FILE_SIZE') {
                    return res.send({
                        message: 'Max file sized 10Mb',
                    });
                }
                return res.send(err);
            }

            return next();
        });
    };
};
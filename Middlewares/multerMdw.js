const multer = require("multer");

const MIME_TYPES = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        cb(null, name + Date.now() + '.' + extension);
    }
})

module.exports = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!MIME_TYPES[file.mimetype]) {
            return cb(new Error("Invalid file type. Only .png, .jpg, and .jpeg are allowed."), false);
        }
        cb(null, true);
    }
}).single('productPicture');

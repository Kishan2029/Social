var express = require('express');
var router = express.Router();

const PostController = require("../controllers/post.controller")

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log("ff", file)
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }

}
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB,
    fileFilter: fileFilter
});

const uploadMiddleware = (req, res, next) => {
    // Use multer upload instance
    upload.array('images')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }

        // Retrieve uploaded files
        const files = req.files;
        console.log("files", files)
        const errors = [];

        // Attach files to the request object
        req.files = files;

        // Proceed to the next middleware or route handler
        next();
    });
};

router.post('/createPost', uploadMiddleware, PostController.createPost)

module.exports = router;

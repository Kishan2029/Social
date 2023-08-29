const express = require('express');
const router = express.Router();
const { imageUpload } = require('../middleware');
const PostController = require("../controllers/post.controller");


router.post('/createPost', imageUpload, PostController.createPost)
router.post('/getPosts', PostController.getPosts)

module.exports = router;

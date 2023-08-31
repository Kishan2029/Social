const express = require('express');
const router = express.Router();
const { imageUpload } = require('../middleware');
const PostController = require("../controllers/post.controller");


router.post('/createPost', imageUpload, PostController.createPost)
router.post('/getUserPosts', PostController.getUserPosts)
router.get('/getAllPosts', PostController.getAllPosts)
router.post('/likePost', PostController.likePost)
router.post('/getSavedPosts', PostController.getSavedPosts)
router.post('/addSavedPost', PostController.addSavedPost)

module.exports = router;

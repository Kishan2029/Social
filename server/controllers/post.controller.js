const PostService = require("../services/post.service")


exports.createPost = async function (req, res, next) {
    try {
        const response = await PostService.createPost(req.body, req.files);
        console.log("res", response)
        res.send(response);
    }
    catch (error) {
        next(error);
    }
}

exports.getUserPosts = async function (req, res, next) {
    try {
        const { email } = req.body;
        const response = await PostService.getUserPosts(email);
        res.status(200).send(response);
    }
    catch (error) {
        next(error);
    }
}

exports.deletePost = async function (req, res, next) {
    try {
        const { email, postId } = req.body;
        const { statusCode, response } = await PostService.deletePost(email, postId);
        console.log("response", response)
        res.status(statusCode).send(response);
    }
    catch (error) {
        next(error);
    }
}

exports.getSavedPosts = async function (req, res, next) {
    try {
        const { email } = req.body;
        const { statusCode, response } = await PostService.getSavedPosts(email);
        res.status(statusCode).send(response);
    }
    catch (error) {
        next(error);
    }
}

exports.getAllPosts = async function (req, res, next) {
    const { email } = req.body;
    try {
        const response = await PostService.getAllPosts(email);
        res.status(200).send(response);
    }
    catch (error) {
        next(error);
    }
}

exports.likePost = async function (req, res, next) {
    const { email, postId, like } = req.body;
    try {
        const { statusCode, response } = await PostService.likePost(email, postId, like);
        res.status(statusCode).send(response);
    }
    catch (error) {
        next(error);
    }
}

exports.addSavedPost = async function (req, res, next) {
    const { email, postId, saved } = req.body;
    try {
        const { statusCode, response } = await PostService.addSavedPost(email, postId, saved);
        res.status(statusCode).send(response);
    }
    catch (error) {
        next(error);
    }
}

exports.hidePost = async function (req, res, next) {
    console.log("hello")
    const { email, postId, hide } = req.body;

    try {
        const { statusCode, response } = await PostService.hidePost(email, postId, hide);
        res.status(statusCode).send(response);
    }
    catch (error) {
        next(error);
    }
}
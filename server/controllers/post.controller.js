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

exports.getAllPosts = async function (req, res, next) {
    try {
        const response = await PostService.getAllPosts();
        res.status(200).send(response);
    }
    catch (error) {
        next(error);
    }
}

exports.likePost = async function (req, res, next) {
    const { email, postId } = req.body;
    try {
        const response = await PostService.likePost(email, postId);
        res.status(200).send(response);
    }
    catch (error) {
        next(error);
    }
}
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


exports.getPosts = async function (req, res, next) {
    try {
        const { email } = req.body;
        const response = await PostService.getPosts(email);
        res.status(200).send(response);
    }
    catch (error) {
        next(error);
    }


}
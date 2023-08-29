const PostService = require("../services/post.service")


exports.createPost = async function (req, res, next) {
    const response = await PostService.createPost(req.body, req.files);
    console.log("res", response)
    res.send(response);

}
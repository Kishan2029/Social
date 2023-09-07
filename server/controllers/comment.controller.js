const CommentService = require("../services/comment.service")




exports.addComment = async function (req, res, next) {
    try {
        const { email, postId, message } = req.body;
        const { statusCode, response } = await CommentService.addComment(email, postId, message);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }
}

exports.getComments = async function (req, res, next) {
    try {
        const { postId } = req.body;
        const { statusCode, response } = await CommentService.getComments(postId);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }
}

exports.deleteComment = async function (req, res, next) {
    try {
        const { commentId } = req.body;
        const { statusCode, response } = await CommentService.deleteComment(commentId);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }
}
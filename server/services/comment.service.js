const User = require('../models/user.model')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')

exports.addComment = async function (email, postId, message) {
    try {
        const user = await User.findOne({ email: email });
        const post = await Post.findById(postId);

        const comment = {
            message,
            createdBy: user,
            post
        }

        const newComment = new Comment(comment)
        await newComment.save();
        return { statusCode: 200, response: { success: true, message: "Comment added" } };
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getComments = async function (postId) {
    try {
        const comment = await Comment.find({ post: postId });
        console.log("comments", comment);

        // const comment = {
        //     message,
        //     createdBy: user,
        //     postId
        // }

        return { statusCode: 200, response: { success: true, data: comment } };
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.deleteComment = async function (commentId) {
    try {

        const comment = await Comment.findById(commentId);

        await comment.deleteOne();
        return { statusCode: 200, response: { success: true, message: "Comment deleted" } };
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}
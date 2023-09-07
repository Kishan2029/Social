const User = require('../models/user.model')
const Post = require('../models/post.model')
const Comment = require('../models/comment.model')
const PostService = require('./post.service')

const getUserName = async (id) => {
    const user = await User.findById(id);
    return user.name;
}

exports.addComment = async function (email, postId, message) {
    try {
        const user = await User.findOne({ email: email });
        const post = await Post.findById(postId);


        const comment = {
            message,
            createdBy: user,
            post
        }
        console.log("comment")
        const newComment = new Comment(comment)
        await newComment.save()


        post.commentCount = post.commentCount ? (Number(post.commentCount) + 1) : 1;
        await post.save()
        // await Promise.all(async () => await post.save(), async () => await newComment.save())


        return { statusCode: 200, response: { success: true, message: "Comment added" } };
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getComments = async function (postId) {
    console.log("postId", postId)
    try {
        let comment = await Comment.find({ post: postId }).sort({ createdAt: -1 })

        comment = await Promise.all(comment.map(async (item) => {
            // const name = await getUserName(item.createdBy);
            return ({

                id: item._id,
                message: item.message,
                time: PostService.postCreationTime(item.createdAt),
                name: "John Doe"
            })
        }))



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
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'post',
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
},
    { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
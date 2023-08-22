const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    }
},
    { timestamps: true }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
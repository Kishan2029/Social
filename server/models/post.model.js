const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    content: {
        type: String,
        // required: true,
    },
    // images: [{
    //     type: Buffer,
    //     contentType: String
    // }],
    images: [{
        data: Buffer,
        contentType: String
    }],
    likes: {
        type: String,
    },
    comments: {
        type: String,
    }

}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
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
    //     data: Buffer,
    //     contentType: String,
    // }],
    images: [{
        type: String
    }],
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
    }],
    // comments: {
    //     type: String,
    // },
    hide: {
        type: Boolean,
        default: false
    },
    commentCount: {
        type: String,
        default: "0"
    }

}, { timestamps: true });

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    coverImage: {
        data: Buffer,
        contentType: String
    },
    backgroundImage: {
        data: Buffer,
        contentType: String
    },
    savedPosts: [{
        type: mongoose.Schema.ObjectId,
        ref: 'post',
    }],
    friends: [{
        type: mongoose.Schema.ObjectId,
        ref: 'user',
    }]


}, { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;
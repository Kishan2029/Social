const User = require('../models/user.model')
const Post = require('../models/post.model')
const fs = require('fs')
const path = require('path')



exports.createPost = async function (body, file) {
    const { email, content } = body;
    console.log("image", file);
    try {
        const user = await User.findOne({ email: email });
        const images = file.map((item) => {
            return {
                data: fs.readFileSync(path.join('./uploads/' + item.filename)),
                contentType: item.mimetype
            }
        })
        const post = {
            content,
            createdBy: user,
            images
        }

        const newPost = new Post(post)
        await newPost.save();
        return "New post is created";
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getPosts = async function (email) {


    try {
        const userId = await User.findOne({ email: email });
        // console.log("userId",user)
        const posts = await Post.find({ createdBy: userId._id })
        console.log("posts", posts);
        return posts;

    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}
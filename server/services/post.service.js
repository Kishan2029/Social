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
        // console.log("images", images)
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
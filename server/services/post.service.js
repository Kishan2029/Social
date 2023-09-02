const User = require('../models/user.model')
const Post = require('../models/post.model')
const fs = require('fs')
const path = require('path')


const postCreationTime = (date) => {
    const diff = new Date() - date;
    seconds_difference = diff / 1000;
    minutes_difference = seconds_difference / 60
    hours_difference = minutes_difference / 60
    days_difference = hours_difference / 24
    weeks_difference = days_difference / 7
    years_difference = days_difference / 365

    if (years_difference > 1)
        return Math.floor(years_difference) + " years";
    else if (weeks_difference > 1)
        return Math.floor(weeks_difference) + " weeks";
    else if (days_difference > 1)
        return Math.floor(days_difference) + " days";
    else if (hours_difference > 1)
        return Math.floor(hours_difference) + " hours";
    else if (minutes_difference > 1)
        return Math.floor(minutes_difference) + " minutes";
    else
        return Math.floor(seconds_difference) + " seconds";
}

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

exports.getUserPosts = async function (email) {

    try {
        const user = await User.findOne({ email: email });
        // console.log("user",user)
        let posts = await Post.find({ createdBy: user._id }).sort({ createdAt: -1 })
        posts = posts.map((item) => ({
            ...item._doc,
            name: user.name,
            postTime: postCreationTime(item._doc.createdAt)

        }))
        console.log("posts", posts);
        return posts;

    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getSavedPosts = async function (email) {

    try {
        const user = await User.findOne({ email: email });
        const savedPosts = Promise.all(user.savedPosts.map(async (postId) => {
            let post = await Post.findById(postId)
            return (
                {
                    post,
                    name: user.name,
                    postTime: postCreationTime(post.createdAt)
                }
            )
        }))

        return { statusCode: 200, response: { success: true, data: savedPosts } };


    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getAllPosts = async function () {

    try {
        // const user = await User.findOne({ email: email });
        // // console.log("user",user)
        let posts = await Post.find().sort({ createdAt: -1 })
        posts = await Promise.all(posts.map(async (item) => {
            // console.log("item", item);
            const user = await User.findById(item._doc.createdBy);
            // console.log("user", user);
            return {
                ...item._doc,
                name: user.name,
                postTime: postCreationTime(item._doc.createdAt)
            }
        }))
        console.log("posts", posts);
        return posts;

    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.likePost = async function (email, postId, like) {
    const user = await User.findOne({ email: email });
    console.log(user._id)
    const post = await Post.findById(postId);
    if (!post) return { statusCode: 400, response: { success: false, message: "Post does not exist" } };

    console.log("post", post.likes)
    const len = post.likes.indexOf(user._id);
    console.log(len)
    if (like) {
        if (len < 0) {
            post.likes.unshift(user._id);
            await post.save();
            return { statusCode: 200, response: { success: true, message: "Post liked" } };
        } else {
            return { statusCode: 200, response: { success: true, message: "Already liked post" } };
        }
    }
    else {
        if (len >= 0) {
            const index = post.likes.indexOf(user._id);
            post.likes.splice(index, 1);
            await post.save();
            return { statusCode: 200, response: { success: true, message: "Post unliked" } };
        } else {
            return { statusCode: 200, response: { success: true, message: "Already unliked post" } };
        }
    }





}

exports.addSavedPost = async function (email, postId, saved) {
    const user = await User.findOne({ email: email });
    const savedPosts = user.savedPosts;
    console.log("savedPost", savedPosts)
    const post = await Post.findById(postId);
    if (!post) return { statusCode: 400, response: { success: false, message: "Post does not exist" } };

    const len = savedPosts.indexOf(postId);

    if (saved) {
        if (len < 0) {
            savedPosts.unshift(postId);
            await user.save();
            return { statusCode: 200, response: { success: true, message: "Saved post", data: savedPosts } };
        } else {
            return { statusCode: 200, response: { success: true, message: "Already saved post" } };
        }
    }
    else {
        if (len >= 0) {
            const index = savedPosts.indexOf(postId);
            savedPosts.splice(index, 1);
            await user.save();
            return { statusCode: 200, response: { success: true, message: "Unsaved post", data: savedPosts } };
        } else {
            return { statusCode: 200, response: { success: true, message: "Already unsaved post" } };
        }
    }

}


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
        let posts = await Post.find({ createdBy: user._id })
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

exports.getAllPosts = async function () {

    try {
        // const user = await User.findOne({ email: email });
        // // console.log("user",user)
        let posts = await Post.find()
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

exports.likePost = async function (postId, like) {

    try {
        const post = await Post.findById(postId);
        if (!post) return false;



    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}
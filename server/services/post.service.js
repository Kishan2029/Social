const User = require('../models/user.model')
const Post = require('../models/post.model')
const fs = require('fs')
const path = require('path')

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'do9w4fypf',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const postCreationTime = exports.postCreationTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const secondsDifference = diff / 1000;
    const minutesDifference = secondsDifference / 60;
    const hoursDifference = minutesDifference / 60;
    const daysDifference = hoursDifference / 24;
    const weeksDifference = daysDifference / 7;
    const monthsDifference = daysDifference / 30;
    const yearsDifference = daysDifference / 365;

    const formatTimeUnit = (value, unit) => {
        const roundedValue = Math.floor(value);
        return roundedValue <= 1 ? `${roundedValue} ${unit}` : `${roundedValue} ${unit}s`;
    }

    if (yearsDifference > 1)
        return formatTimeUnit(yearsDifference, 'year');
    else if (monthsDifference > 1)
        return formatTimeUnit(monthsDifference, 'month');
    else if (weeksDifference > 1)
        return formatTimeUnit(weeksDifference, 'week');
    else if (daysDifference > 1)
        return formatTimeUnit(daysDifference, 'day');
    else if (hoursDifference > 1)
        return formatTimeUnit(hoursDifference, 'hour');
    else if (minutesDifference > 1)
        return formatTimeUnit(minutesDifference, 'minute');
    else
        return formatTimeUnit(secondsDifference, 'second');
}
const isUserOwner = (userId, postId) => {
    return String(userId) === String(postId);
}

const isUserFriend = (array, item) => {
    return array.includes(item);
}

const hasUserLiked = (array, item) => {
    return array.includes(item);
}

exports.createPost = async function (body, file) {
    const { email, content } = body;

    try {
        const user = await User.findOne({ email: email }).select({ _id: 1 });
        const images = await Promise.all(file.map(async (item) => {
            console.log("item", item)
            const postImage = await cloudinary.uploader.upload(path.join('./uploads/' + item.filename),
                { public_id: item.filename },
                (error, result) => {
                    console.log("result", result)
                    if (error)
                        console.log("Image upload error")
                })
            return postImage.url;
        }))
        console.log("images", images)
        const post = {
            content,
            createdBy: user,
            images
        }

        const newPost = new Post(post)
        const res = await newPost.save();
        return {
            statusCode: 200, response: {
                success: true, message: "New post is created",
                data: res,
                notification: {
                    value: true,
                    message: "New post is created"
                }
            }
        };

    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.deletePost = async function (email, postId) {
    const user = await User.findOne({ email: email }).select({ _id: 1 });

    const userId = user._id;
    const post = await Post.findById(postId);

    if (!post) return {
        statusCode: 400, response: {
            success: false, message: "Post does not exist", notification: {
                value: true,
                message: "Post does not exist"
            }
        }
    };

    if (String(userId) !== String(post.createdBy)) return {
        statusCode: 400, response: {
            success: false, message: "Post is not created by user", notification: {
                value: true,
                message: "Post is not created by user"
            }
        }
    };

    await post.deleteOne();

    return {
        statusCode: 200, response: {
            success: true, message: "Post is deleted", notification: {
                value: true,
                message: "Post is deleted"
            }
        }
    };

}

exports.getUserPosts = async function (email) {

    try {
        const user = await User.findOne({ email: email }).select({ _id: 1, name: 1, savedPosts: 1, friends: 1 });
        // console.log("user",user)
        let posts = await Post.find({ createdBy: user._id }).sort({ createdAt: -1 })
        posts = await Promise.all(posts.map(async (item) => {
            const userAvatar = await User.findById(item.createdBy).select({ _id: 1, name: 1, profileImage: 1 });
            return {
                ...item._doc,
                name: userAvatar.name,
                avatar: userAvatar.profileImage,
                postTime: postCreationTime(item._doc.createdAt),
                saved: user.savedPosts.includes(item._id) ? true : false,
                owner: true,
                like: hasUserLiked(item.likes, user._id),
                likeCount: item.likes.length,
                // friend: isUserFriend(user.friends, item.createdBy)
            }
        }))


        return {
            statusCode: 200, response: {
                success: true, data: posts, notification: {
                    value: false
                }
            }
        };

    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getSavedPosts = async function (email) {

    try {
        const user = await User.findOne({ email: email }).select({ _id: 1, name: 1, savedPosts: 1, friends: 1 });

        let savedPosts = await Promise.all(user.savedPosts.map(async (postId) => {
            let post = await Post.findById(postId);
            // console.log(post)
            if (post) {
                const userAvatar = await User.findById(post.createdBy).select({ _id: 1, name: 1, profileImage: 1 });
                return (
                    {
                        ...post._doc,
                        name: userAvatar.name,
                        avatar: userAvatar.profileImage,
                        postTime: postCreationTime(post.createdAt),
                        saved: true,
                        owner: isUserOwner(user._id, post.createdBy),
                        like: hasUserLiked(post.likes, user._id),
                        likeCount: post.likes.length,
                        friend: isUserFriend(user.friends, post.createdBy)
                    }
                )
            }


        }))
        savedPosts = savedPosts.filter((item) => item)

        return {
            statusCode: 200, response: {
                success: true, data: savedPosts,
                notification: {
                    value: false
                }
            }
        };


    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getAllPosts = async function (email) {

    try {
        const user = await User.findOne({ email: email }).select({ _id: 1, name: 1, savedPosts: 1, friends: 1 });
        console.log("user", user)
        var posts = await Post.find().sort({ createdAt: -1 });
        console.log("posts")
        posts = await Promise.all(posts.map(async (item) => {
            const userAvatar = await User.findById(item.createdBy).select({ _id: 1, name: 1, profileImage: 1, });
            return {
                ...item._doc,
                name: userAvatar.name,
                avatar: userAvatar.profileImage,
                postTime: postCreationTime(item._doc.createdAt),
                saved: user.savedPosts.includes(item._id) ? true : false,
                owner: isUserOwner(user._id, item.createdBy),
                like: hasUserLiked(item.likes, user._id),
                likeCount: item.likes.length,
                friend: isUserFriend(user.friends, item.createdBy)
            }
        }))

        posts = posts.filter((item) => !item.hide)

        return {
            statusCode: 200, response: {
                success: true, data: posts,
                notification: {
                    value: false
                }
            }
        };

    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.likePost = async function (email, postId, like) {
    const user = await User.findOne({ email: email }).select({ _id: 1 });

    const post = await Post.findById(postId).select({ likes: 1 });
    if (!post) return {
        statusCode: 400, response: {
            success: false, message: "Post does not exist",
            notification: {
                value: true,
                message: "Post does not exist"
            }
        }
    };

    console.log("likes", post.likes)
    const len = post.likes.indexOf(user._id);
    console.log("len", len)
    if (like) {
        if (len < 0) {
            post.likes.unshift(user._id);
            await post.save();
            return {
                statusCode: 200, response: {
                    success: true, message: "Post liked",
                    notification: {
                        value: true,
                        message: "You liked a post"
                    }
                }
            };
        } else {
            return {
                statusCode: 200, response: {
                    success: true, message: "Already liked post", notification: {
                        value: true,
                        message: "Already liked a post"
                    }
                }
            };
        }
    }
    else {
        if (len >= 0) {
            const index = post.likes.indexOf(user._id);
            post.likes.splice(index, 1);
            await post.save();
            return {
                statusCode: 200, response: {
                    success: true, message: "Post unliked",
                    notification: {
                        value: true,
                        message: "Post Unliked"
                    }
                }
            };
        } else {
            return { statusCode: 200, response: { success: true, message: "Already unliked post" } };
        }
    }





}

exports.addSavedPost = async function (email, postId, saved) {
    const user = await User.findOne({ email: email }).select({ _id: 1, savedPosts: 1 });
    const savedPosts = user.savedPosts;

    const post = await Post.findById(postId).select({ _id: 1 });
    if (!post) return {
        statusCode: 400, response: {
            success: false, message: "Post does not exist",
            notification: {
                value: true,
                message: "Post does not exist"
            }
        }
    };

    const len = savedPosts.indexOf(postId);

    if (saved) {
        if (len < 0) {
            savedPosts.unshift(postId);
            await user.save();
            return {
                statusCode: 200, response: {
                    success: true, message: "Saved post", data: savedPosts,
                    notification: {
                        value: true,
                        message: "Post is saved"
                    }
                }
            };
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

exports.hidePost = async function (email, postId, hide) {
    const user = await User.findOne({ email: email }).select({ _id: 1 });
    // console.log("user", user)
    // console.log(user)
    const userId = user._id;
    const post = await Post.findById(postId).select({ _id: 1, createdBy: 1, hide: 1 });

    if (!post) return {
        statusCode: 400, response: {
            success: false, message: "Post does not exist", notification: {
                value: true,
                message: "Post does not exist"
            }
        }
    };

    if (!isUserOwner(userId, post.createdBy)) return {
        statusCode: 400, response: {
            success: false, message: "Post is not created by user", notification: {
                value: true,
                message: "Post is not created by user"
            }
        }
    };

    // const len = savedPosts.indexOf(postId);
    post.hide = hide;
    await post.save();
    const message = hide ? "Post is hidden" : "Post is visible"
    return {
        statusCode: 200, response: {
            success: true, message, notification: {
                value: true,
                message: message
            }
        }
    };

}

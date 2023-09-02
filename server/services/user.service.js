var User = require('../models/user.model')
const Post = require('../models/post.model')

exports.getUserInfo = async function (email) {

    try {
        const userInfo = await User.find({ email: email }).select({ description: 1, location: 1, _id: 0 })
        console.log("user", userInfo);
        return { statusCode: 200, response: { success: true, data: userInfo[0] } };

    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.addFriend = async function (email, freindId, add) {
    // console.log("friendId", freindId)
    try {
        const user = await User.findOne({ email: email }).select({ friends: 1 });
        const friends = user.friends;
        console.log("friends", friends)
        const friendExist = await User.findById(freindId);
        // console.log(friendExist)
        if (!friendExist) return { statusCode: 400, response: { success: false, message: "UserId does not exist" } };

        const len = friends.indexOf(freindId);

        if (add) {
            if (len < 0) {
                friends.unshift(freindId);
                await user.save();
                return { statusCode: 200, response: { success: true, message: "Friend added", data: friends } };
            } else {
                return { statusCode: 200, response: { success: true, message: "Already you are friend" } };
            }
        }
        else {
            if (len >= 0) {
                const index = friends.indexOf(freindId);
                friends.splice(index, 1);
                await user.save();
                return { statusCode: 200, response: { success: true, message: "Friend removed", data: friends } };
            } else {
                return { statusCode: 200, response: { success: true, message: "Already unfollowed" } };
            }
        }

    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getFriends = async function (email) {

    try {
        const user = await User.findOne({ email: email }).select({ friends: 1 });
        let friends = user.friends;
        friends = await Promise.all(friends.map(async (id) => {
            const temp = await User.findById(id);
            return {
                name: temp.name
            }
        }))
        // console.log("fridnss", user)
        return { statusCode: 200, response: { success: true, data: friends } };
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getPhotos = async function (email) {
    console.log(email)
    try {
        const user = await User.findOne({ email: email });
        // console.log("user", user);
        let posts = await Post.find({ createdBy: user._id }).sort({ createdAt: -1 }).select({ images: 1, _id: 0 })
        let images = [];
        posts.map((post) => {
            images = images.concat(post.images)
        })
        return { statusCode: 200, response: { success: true, data: images } };
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}


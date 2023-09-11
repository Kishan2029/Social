const User = require('../models/user.model')
const Post = require('../models/post.model')
const Notification = require('../models/notification.model');
const { getUserName } = require('./comment.service');
const { postCreationTime } = require('./post.service');

exports.addNotification = async function (type, postId, email) {
    console.log("type", type);
    console.log("postId", postId);
    console.log("email", email);

    try {


        const user = await User.findOne({ email: email }).select({ _id: 1 });

        const post = await Post.findById(postId);

        const notification = {
            type,
            postId,
            actionPerformedUser: user,
            postOwnerUser: post.createdBy
        }

        const newNotification = new Notification(notification)
        await newNotification.save()

        return {
            statusCode: 200, response: {
                success: true, message: "Notification added", notification: {
                    value: false
                }
            }
        };
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getNotifications = async function (email) {
    console.log("email", email)
    try {
        const user = await User.findOne({ email: email }).select({ _id: 1 });
        console.log("user")
        let notifications = await Notification.find({ postOwnerUser: user._id }).sort({ createdAt: -1 })
        console.log("notification")
        notifications = await Promise.all(notifications.map(async (item) => {
            const name = await getUserName(item.actionPerformedUser);
            return ({
                type: item.type,
                name,
                message: item.type === "like" ? `${name} liked your Post` : `${name} commented on your Post`,
                time: postCreationTime(item.createdAt)
            })
        }))

        return {
            statusCode: 200, response: {
                success: true, data: notifications, notification: {
                    value: false
                }
            }
        };
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}


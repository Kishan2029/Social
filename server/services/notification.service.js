const User = require('../models/user.model')
const Post = require('../models/post.model')
const Notification = require('../models/notification.model');
const { getUserName } = require('./comment.service');
const { postCreationTime } = require('./post.service');

exports.addNotification = async function (type, postId, email, value) {
    console.log("type", type);
    console.log("postId", postId);
    console.log("email", email);

    try {
        const user = await User.findOne({ email: email }).select({ _id: 1 });

        if (value) {
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
        } else {
            await Notification.deleteOne({ type, postId, actionPerformedUser: user })

            return {
                statusCode: 200, response: {
                    success: true, message: "Notification deleted", notification: {
                        value: false
                    }
                }
            };
        }

    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}

exports.getNotifications = async function (email) {

    try {
        const user = await User.findOne({ email: email }).select({ _id: 1 });

        let notifications = await Notification.find({ postOwnerUser: user._id }).sort({ createdAt: -1 })

        notifications = await Promise.all(notifications.map(async (item) => {
            const notificationUser = await User.findById(item.actionPerformedUser).select({ name: 1, profileImage: 1 });
            const name = notificationUser.name;
            const message = item.type === "like" ? `liked your Post` : (item.type === "comment" ? `commented on your Post` : `started following you`)
            return ({
                type: item.type,
                name,
                message,
                time: postCreationTime(item.createdAt),
                avatar: notificationUser.profileImage
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


const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['like', 'comment'],
        default: 'like',
        required: true,
    },
    actionPerformedUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    },
    postId: {
        type: mongoose.Schema.ObjectId,
        ref: 'post',
        required: true
    },
    postOwnerUser: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    }
},
    { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
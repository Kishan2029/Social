const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['like', 'comment'],
        default: 'like',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'user',
        required: true,
    }
},
    { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
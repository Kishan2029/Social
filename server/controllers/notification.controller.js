const NotificationService = require("../services/notification.service")

exports.addNotification = async function (req, res, next) {
    try {
        const { type, postId, email, value } = req.body;
        const { statusCode, response } = await NotificationService.addNotification(type, postId, email, value);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }
}

exports.getNotifications = async function (req, res, next) {
    try {
        const { email } = req.body;
        const { statusCode, response } = await NotificationService.getNotifications(email);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }
}


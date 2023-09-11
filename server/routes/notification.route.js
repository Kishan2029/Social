const { Router } = require("express");
const router = Router();

const NotificationController = require("../controllers/notification.controller")

router.post('/', NotificationController.getNotifications)
router.post('/addNotification', NotificationController.addNotification)


module.exports = router;

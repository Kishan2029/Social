const { Router } = require("express");
const { imageUpload } = require('../middleware');
const router = Router();

const UserController = require("../controllers/user.controller")


router.get('/:email', UserController.getUserInfo)
router.get('/getFriends/:email', UserController.getFriends)
router.get('/getPhotos/:email', UserController.getPhotos)
router.post('/addFriend', UserController.addFriend)
router.post('/profile/updateText', UserController.updateProfileText)
router.post('/profile/updateImage', imageUpload, UserController.updateProfileImage)


module.exports = router;

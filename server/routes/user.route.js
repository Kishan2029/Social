const { Router } = require("express");
const router = Router();

const UserController = require("../controllers/user.controller")


router.get('/:email', UserController.getUserInfo)
router.get('/getFriends/:email', UserController.getFriends)
router.get('/getPhotos/:email', UserController.getPhotos)
router.post('/addFriend', UserController.addFriend)
router.post('/profile/editText', UserController.editProfileText)
router.post('/profile/editImage', UserController.editProfileImage)


module.exports = router;

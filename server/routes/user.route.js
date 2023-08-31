const { Router } = require("express");
const router = Router();

const UserController = require("../controllers/user.controller")


router.get('/:email', UserController.getUserInfo)


module.exports = router;

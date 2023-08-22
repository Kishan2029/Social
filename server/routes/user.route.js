const { Router } = require("express");
const router = Router();

const UserController = require("../controllers/user.controller")


router.post('/createUser', UserController.createUser)


module.exports = router;

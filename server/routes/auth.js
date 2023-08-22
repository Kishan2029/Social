const { Router } = require("express");
const router = Router();

const AuthController = require("../controllers/auth")


router.get('/test', AuthController.testAuth)
router.post('/', AuthController.auth)

module.exports = router;

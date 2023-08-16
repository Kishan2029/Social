const { Router } = require("express");
const router = Router();

const AuthController = require("../controllers/auth")
router.get('/', AuthController.testAuth)

module.exports = router;

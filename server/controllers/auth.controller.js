const AuthService = require("../services/auth.service")


exports.login = async function (req, res, next) {
    const body = req.body;
    console.log("body", req.body);
    const response = await AuthService.createUser(body);
    console.log("res", response)
    res.send(response);

}
const AuthService = require("../services/auth.service")

exports.createUser = async function (req, res, next) {
    const response = await UserService.createUser();
    console.log("res", response)
    res.send(response);

}

exports.login = async function (req, res, next) {
    const body = req.body;
    console.log("body", req.body);
    const response = await AuthService.createUser(body);
    console.log("res", response)
    res.send(response);

}
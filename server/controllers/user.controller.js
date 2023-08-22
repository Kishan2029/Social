const UserService = require("../services/user.service")

exports.createUser = async function (req, res, next) {
    const response = await UserService.createUser();
    console.log("res", response)
    res.send(response);

}


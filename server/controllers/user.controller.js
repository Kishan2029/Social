const UserService = require("../services/user.service")


exports.getUserInfo = async function (req, res, next) {
    try {
        const { email } = req.params;
        const { statusCode, response } = await UserService.getUserInfo(email);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }


}


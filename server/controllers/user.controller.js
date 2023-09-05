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

exports.addFriend = async function (req, res, next) {

    try {
        const { email, friendId, add } = req.body;

        const { statusCode, response } = await UserService.addFriend(email, friendId, add);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }
}

exports.getFriends = async function (req, res, next) {
    try {
        const { email } = req.params;
        const { statusCode, response } = await UserService.getFriends(email);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }
}

exports.getPhotos = async function (req, res, next) {
    try {
        const { email } = req.params;
        const { statusCode, response } = await UserService.getPhotos(email);
        res.status(statusCode).send(response);
    } catch (error) {
        next(error)
    }
}

exports.editProfileText = async function (req, res, next) {
    const { email, location, name } = req.body;
    try {
        const { statusCode, response } = await UserService.editProfileText(email, location, name);
        res.status(statusCode).send(response);
    }
    catch (error) {
        next(error);
    }
}

exports.editProfileImage = async function (req, res, next) {
    const { imageType, email } = req.body;
    try {
        const { statusCode, response } = await UserService.editProfileImage(email, imageType, req.files);
        res.status(statusCode).send(response);
    }
    catch (error) {
        next(error);
    }
}



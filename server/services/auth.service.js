var User = require('../models/user.model')

exports.createUser = async function (body) {

    try {
        const newUser = new User(body)
        await newUser.save();
        return "Document added";
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}
var User = require('../models/user.model')

exports.getUserInfo = async function (email) {

    try {
        const userInfo = await User.find({ email: email }).select({ description: 1, location: 1, _id: 0 })
        console.log("user", userInfo);
        return { statusCode: 200, response: { success: true, data: userInfo[0] } };

    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}
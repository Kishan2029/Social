var User = require('../models/user.model')

exports.createUser = async function (query, page, limit) {

    try {
        const newUser = new User({
            name: "kishan",
            email: "kishan@gmail.com",
            description: "hello My name is kishan",
            location: "Pune, India"
        })
        await newUser.save();
        return "Document added";
    } catch (e) {
        // Log Errors
        console.log("error", e)
    }
}
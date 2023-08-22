exports.testAuth = async function (req, res, next) {
    res.send("testAuth is working");
}

exports.auth = async function (req, res, next) {
    res.send("auth is working");
}
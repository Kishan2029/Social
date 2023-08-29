const admin = require("../config/firebaseConfig");

const checkAuth = async (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) return res.json({ message: 'Un authorize' });
    token = token.split(' ')[1];
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);
        if (decodeValue) {
            // req.user = decodeValue;
            return next();
        }
        return res.json({ message: 'Un authorize' });
    } catch (e) {
        console.log("error", e.errorInfo);
        if (e.errorInfo.code === "auth/id-token-expired") {
            return res.json({ message: "Firebase ID token has expired. Please login again" });
        }
        return res.json({ message: 'Internal Error' });
    }

};

module.exports = { checkAuth };
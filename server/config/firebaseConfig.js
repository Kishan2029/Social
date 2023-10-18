const admin = require("firebase-admin");

const serviceAccount = process.env.NODE_ENV === "production" ? require("../serviceAccount.json") : require("../credentials/serviceAccount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

module.exports = admin;
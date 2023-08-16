// const { Router } = require("express");
// const router = Router();

// router.use("/auth", require("./auth"));
// router.use("/posts", require("./posts"));
// router.use("/users", require("./users"));
module.exports = (app) => {
    app.use("/auth", require("./auth"));
    app.use("/posts", require("./posts"));
    app.use("/users", require("./users"));
};



module.exports = (app) => {
    app.use("/auth", require("./auth.route"));
    app.use("/post", require("./post.route"));
    app.use("/user", require("./user.route"));
};



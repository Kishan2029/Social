module.exports = (app) => {
    app.use("/auth", require("./auth.route"));
    app.use("/posts", require("./posts"));
    app.use("/users", require("./user.route"));
};



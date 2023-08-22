module.exports = (app) => {
    app.use("/auth", require("./auth"));
    app.use("/posts", require("./posts"));
    app.use("/users", require("./user.route"));
};



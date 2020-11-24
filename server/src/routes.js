const express = require("express");
const routes = express.Router();
const path = require("path");
const users = require("./userController");

routes.use(express.static(path.join(__dirname, "/PUBLIC/")));

routes.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/PUBLIC/index.html"));
});

routes.get("/newid/:name", users.newUser);

module.exports = routes;
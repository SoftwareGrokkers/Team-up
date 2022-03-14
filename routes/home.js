const express = require("express");
const router = express.Router();
const User = require("../Schema/User");

router.route("/").get(getRouterHandler);

function getRouterHandler(req, res) {
    res.send("<h1>welcome to the home page</h1>");
}

module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../Schema/User");

//localhost:3000/users
router.route("/").get(getRouterHandler);

function getRouterHandler(req, res) {
  let users = User.find().cursor();
  res.json(users);
}

module.exports = router;

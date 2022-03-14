const express = require("express");
const router = express.Router();

//home page
router.use("/", require("./home"));

//register page
router.use("/register", require("./register"));

//localhost:3000/users
router.use("/users", require("./users"));

module.exports = router;
const express = require("express");
const router = express.Router();
const User = require("../Schema/User")


//localhost:3000/register
router.route("/").get(getRouterHandler).post(postRouterHandler);

function getRouterHandler(req, res) {
    res.send("<h1>welcome to the registration page</h1>");
}
function postRouterHandler(req, res) {
    User.findOne({ email: req.body.email }, function (err, user){
        if (err){
            console.log(err);
            res.send(err);
        }
        if(user){
            res.send("User already exists")
        }else {
            const newUser = new User(req.body);
            newUser.save(function (err, user) {
                if (err) {
                    console.log(err);
                    res.send(err);
                }
                res.send(user);
            });
        }
    });
}

module.exports = router;
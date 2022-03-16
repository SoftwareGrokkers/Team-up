var mongoose = require("mongoose");

var userBuilder = mongoose.Schema({
	
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number,
    activity: String,
    
});

var users = mongoose.model("Users", userBuilder);
module.exports = users;
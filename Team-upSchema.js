var mongoose = require("mongoose");

var userBuilder = mongoose.Schema({
	
    firstname: String,
    lastname: String,
    gender: String,
    email: String,
    password: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number,
    activities: Array,
    groups: Array,
    
});

var users = mongoose.model("Users", userBuilder);
module.exports = users;
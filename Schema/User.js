const mongoose = require("mongoose");

const userBuilder = mongoose.Schema({
	
    firstname: String,
    lastname: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number,
    activity: String,
    
});

const User = mongoose.model("User", userBuilder);
module.exports = User;
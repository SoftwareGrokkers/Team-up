var mongoose = require("mongoose");

var activityBuilder = mongoose.Schema({
	
    
    Name: String,
    type: String,
    description: String,
    location: String,
    time: String,
    creator: String
    
});

var activities = mongoose.model("activities", activityBuilder);
module.exports = activities;
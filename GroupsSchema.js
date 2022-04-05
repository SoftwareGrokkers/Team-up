var mongoose = require("mongoose");

var groupBuilder = mongoose.Schema({
	
    
    
    
    Name: String,
    type: String,
    description: String,
    creator: String
    
});

var groups = mongoose.model("groups", groupBuilder);
module.exports = groups;
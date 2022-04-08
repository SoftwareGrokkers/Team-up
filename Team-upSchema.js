const mongoose = require("mongoose");

// const userBuilder = new mongoose.Schema({
	
    // firstname: String,
    // lastname: String,
    // gender: String,
    // email: String,
    // password: String,
    // phone: String,
    // street: String,
    // city: String,
    // state: String,
    // zipcode: Number,
    // activities: Array,
    // groups: Array,
    
// });

class Team_upSchema{
    userBuilder(){
        var userBuilder = new mongoose.Schema({
            
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
        return userBuilder
    }
}
// const activityBuilder = new mongoose.Schema({
	
    
    // Name: String,
    // type: String,
    // description: String,
    // location: String,
    // time: String,
    
// });


// const groupBuilder = new mongoose.Schema({
	
    
    
    
    // Name: String,
    // type: String,
    // description: String,
    
    
// });
userB = new Team_upSchema()
userBuilder = userB.userBuilder()
var users = mongoose.model("users", userBuilder);
// const activities = mongoose.model("Activities", activityBuilder);
// const groups = mongoose.model("Groups", groupBuilder);
module.exports = users
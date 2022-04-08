var mongoose = require("mongoose");

class ActivitiesSchema{
    activityBuilder(){
        var activityBuilder = mongoose.Schema({
            
            
            Name: String,
            type: String,
            description: String,
            location: String,
            time: String,
            creator: String
            
        });
        return activityBuilder
    }
}
activityB = new ActivitiesSchema()
activityBuilder = activityB.activityBuilder()
var activities = mongoose.model("activities", activityBuilder);
module.exports = activities;
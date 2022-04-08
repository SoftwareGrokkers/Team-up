var mongoose = require("mongoose");

class GroupsSchema{
    groupBuilder(){
        var groupBuilder = mongoose.Schema({
            
            
            
            
            Name: String,
            type: String,
            description: String,
            creator: String
            
        });
        return groupBuilder
    }
}

groupB = new GroupsSchema()
groupBuilder = groupB.groupBuilder()
var groups = mongoose.model("groups", groupBuilder);
module.exports = groups;
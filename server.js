var express = require('express')
var app = express()
var fs = require("fs")


app.set('port', process.env.port || 3000)


app.get('/', function(req, res){
    // home page
    res.write("<h1>Welcome to the home page</h1>")
});

app.get('/activties', function(req,res){
    //TODO
    var activties = get_activities();
    
})


app.post('/process-login', function(req,res){
    //TODO
    
})

app.post('/process-signup', function(req,res){
    //TODO
    
})

app.post('upload-activty', function(req,res){
    //TODO
    
})

app.listen(app.get("port"), function(){
	console.log("server running")
})

class login-signup{
	
	var process-signup = function(){
		// process signup
	}
	
	var process-login = function(){
		// process login
	}
	
	var get-preference = function(){
		// get user preference
	}
	
	var go-to-homepage = function(){
		// go to homepage
	}
}



class connect-to-database{
	var create_db_connection = function(){
		// connect to database
	}
	var close_db_connection = function(){
		// close database connection
	}
}

class Homepage{
	var show-groups = function(){
		// show user groups
	}
	
	var sort-activites = function(){
		// sort activites
	}
	
	var get_activities-data = function(){
		// get activites data
	}
	
	
}
class chat-room{
	var create-chat-room = function(){
		// create chat room
	}
	
	var close-chat-room = function(){
		
	}
}
class Group-chat{
	var create-chat-room = function(){
		// create chat room
	}
	
	var close-chat-room = function(){
		// close chat room
	}
	
	var get_activities = function(){
		//TODO
	}
	
}
class Private-chat{
	var create-chat-room = function(){
		// create chat room
	}
	
	var close-chat-room = function(){
		
	}
}

class Group{
	var show-groups = function(){
		// show user groups
	}
	
}

class Sort-Groups{
	var sort-activites = function(){
		// sort activites
	}
	
	var get_activities = function(){
		//TODO
	}
	
	var sort-location = function(){
		// sort location
	}
	var sort-time = function(){
		// sort time
	}
}

class search{
	var search-activites = function(){
		// search activities
	}
	var search-groups = function(){
		// search groups
	}
}
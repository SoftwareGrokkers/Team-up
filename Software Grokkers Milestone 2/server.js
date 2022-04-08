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
	
	var authenticate-signup = function(){
		// process signup
	}
	
	var authenticate-login = function(){
		// process login
	}
	
	var get-preference = function(){
		// get user preference
	}
	
	var go-to-homepage = function(){
		// go to homepage
	}
}



class Database_Manager{
	var create_db_connection = function(){
		// connect to database
	}
	var close_db_connection = function(){
		// close database connection
	}
	
	var retrive_data = function(){
		// retrives data
	}
	
	var send_data = function(){
		// sends data
	}
}

class Homepage{
	var show-groups = function(){
		// show user groups
	}
	
	var get-user-preferences = function(){
		// get user preferences
	}
	
	var log-out = function(){
		// get activites data
	}
	
	var login-signup = function(){
		// show login/signup page
	}
	
	
}

}
class Groups{
	var create-chat-room = function(){
		// create chat room
	}
	
	var close-chat-room = function(){
		// close chat room
	}
	
	var go-to-homepage = function(){
		//TODO
	}
	
}


class Chat-Room{
	var create-chat-room = function(){
		// create chat room
	}
	
	var close-chat-room = function(){
		// close chat room
	}
	
	var send-chat-data = function(){
		// send chat data
	}
	
	var retrive-chat-data = function(){
		// retrieve chat data
	}
}

class Chat-Manager{
	var create_db_connection = function(){
		// connect to database
	}
	var close_db_connection = function(){
		// close database connection
	}
	
	var retrive_data = function(){
		// retrives data
	}
	
	var send_data = function(){
		// sends data
	}
}


class User-preferences{
	class Sort-Activities{
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
	
	class Search-Activities{
		var search-activites = function(){
			// search activities
		}
		var search-groups = function(){
			// search groups
		}
	}
}


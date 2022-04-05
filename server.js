//TODO validate email
// send emails to new users
// change cookie on login and logout
// encript password
// handle errors

var express = require('express')

var session = require('express-session');
var cookieParser = require('cookie-parser');
const flash = require('connect-flash')
var app = express()
app.use(cookieParser('secret')); //TODO move to models
app.use(session({cookie: { maxAge: 60000 }}));
app.use(flash());
app.use(express.static(__dirname+'/frontEnd')) //TODO figure this out
frontEndPath = __dirname+'/frontEnd'
// var fs = require("fs")
var credentials = require("./models/credentials.js")
var passwordEncrypter = require("./models/passwordEncrypter.js")
// var handlebars = require("express-handlebars").create({defaultLayout: "main"})
var Team_upUsers = require("./Team-upSchema.js")
var Team_upActivities = require("./ActivitiesSchema.js")
var Team_upGroups = require("./GroupsSchema.js")
// app.engine("handlebars", handlebars.engine)
// app.set("view engine", "handlebars")
app.use(require("body-parser")());

const path = require('path')


app.set('port', process.env.port || 3000)
var mongoose = require('mongoose')
// Kathan wuz here :)
app.get('/', function(req, res){
    // res.type('text/html')
    // res.write("<h1>Welcome to the home page</h1>")
    
    res.sendFile(frontEndPath+'/index.html');
});

app.get('/home', function(req,res){
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        res.redirect('/')
        console.log("not logged in")
    }
    else{
        res.sendFile(frontEndPath+'/home.html');
    }
})

app.get('/activties', function(req,res){
    //TODO
    var activties = get_activities();
    
})

//not tested!!!!
app.get('/userActivities', function(req,res){
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        res.redirect('/')
        console.log("not logged in")
    }
    // console.log("User cookie: ",userCookie.userEmail)
    // if (userCookie.length > 0){
        // console.log("here")
        // Team_upUsers.find({email:userCookie.userEmail}, function(err,Team_upUser){
            // console.log(Team_upUser)
            // if ((Team_upUser == null) || (Team_upUser.length == 0)){
            // console.log("user doesn't exist")
            // res.redirect('/incorrectLogin')
            // }
            // else{
                // // console.log("here")
                // res.json(Team_upUser.activites)
            // }
        // })
    // }
    Team_upUsers.find({email:userCookie.userEmail}, function(err,Team_upUser){
        // console.log(Team_upUser[0]['activities'])
        // console.log("activity: ",Team_upUser[0].activities)
        res.json(Team_upUser[0].activities)
    })
    
})

app.get('/userGroups', function(req,res){
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        res.redirect('/')
        console.log("not logged in")
    }
    // console.log("User cookie: ",userCookie.userEmail)
    // if (userCookie.length > 0){
        // console.log("here")
        // Team_upUsers.find({email:userCookie.userEmail}, function(err,Team_upUser){
            // console.log(Team_upUser)
            // if ((Team_upUser == null) || (Team_upUser.length == 0)){
            // console.log("user doesn't exist")
            // res.redirect('/incorrectLogin')
            // }
            // else{
                // // console.log("here")
                // res.json(Team_upUser.activites)
            // }
        // })
    // }
    Team_upUsers.find({email:userCookie.userEmail}, function(err,Team_upUser){
        
        // res.json(Team_upUser.groups) // Change this back to groups!!
        // console.log(Team_upUser.activity)
        res.json(Team_upUser[0].groups)
    })
    
})

app.get('/searchGroupsAndActivitiesPage', function(req,res){
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        // res.json({})
        console.log("not logged in")
        res.sendFile(frontEndPath+'/index.html');
    }
    
})

app.post('/searchGroupsAndActivities', function(req,res){
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        // res.json({})
        console.log("not logged in")
        res.sendFile(frontEndPath+'/index.html');
    }
    
})

app.get('/createGroupsAndActivitiesPage', function(req,res){
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        // res.json({})
        console.log("not logged in")
        res.sendFile(frontEndPath+'/index.html');
    }
    else{
        res.sendFile(frontEndPath+'/addingGroups.html')
    }
})

app.post('/createGroup', function(req,res){
    var userCookie = req.cookies
    if (userCookie.userEmail == null){
        // res.json({})
        console.log("not logged in")
        res.sendFile(frontEndPath+'/index.html');
    }
    else{
        var filter = {"email":userCookie.userEmail}
        Team_upUsers.find(filter, function(err, Team_upUser){
            var groupList = []
            
            var newgroup = {
            "Name": req.body.groupName,
            "type": req.body.type,
            "description": req.body.description
            }
            
            for(var i=0; i<Team_upUser[0].groups.length; i++){
                groupList.push(Team_upUser[0].groups[i])
            }
            
            groupList.push(newgroup)
            // console.log(Team_upUser[0].activities)
            // console.log("activity list inside q: ", aactivityList)
            
            var update = {
                groups: groupList
            }
            
            Team_upUsers.findOneAndUpdate(filter,update,function(err,doc){
                console.log("successfully updated")
            })
        })
        
        var groupfilter = {"Name": req.body.groupName}
        
        Team_upGroups.find(groupfilter, function(err, Team_upGroup){
            if (Team_upGroup.length){
                console.log("Group already exists")
                res.redirect("/home")
            }
            
            new Team_upGroups({
            "Name": req.body.groupName,
            "type": req.body.type,
            "description": req.body.description
            }).save(function(err, a){
                if(err) return res.send(500, "Error occured: database error")
                // res.json({id:a._id})
            })
            console.log("successfully made group")
            
        })
        
        
        res.redirect('/home')
    }
})

async function getUserDetails (filter, callback){
    await Team_upUsers.find(filter, function(err, Team_upUser){
        // activityList.push(Team_upUser[0].activities)
        if (err){
            callback(err, null)
        }
        else{
        // console.log("here")
        // res = Team_upUser[0].activities
        // console.log(Team_upUser[0])
        callback(null, Team_upUser[0])
        }
    })
    
}

// const getUserDetails = (filter) => {
    // return Team_upUsers.find(filter).exec();
// }

app.post('/createActivity', function(req,res){
    var userCookie = req.cookies
    if (userCookie.userEmail == null){
        // res.json({})
        console.log("not logged in")
        // res.sendFile(frontEndPath+'/index.html');
        res.redirect('/')
    }
    else{
        var filter = {"email":userCookie.userEmail}
        // var activityList = []
        
        // Team_upUsers.find(filter, function(err, Team_upUser){
            // // activityList.push(Team_upUser[0].activities)
            // console.log("db activities", Team_upUser[0].activities)
            // var activities = Team_upUser[0].activities
            // for(var i=0; i<activities.length; i++){
                // // activityList.push(Team_upUser[0].activites[i])
                // activityList.push(activities[i])
            // }
            // console.log("activitylist in qq",activityList)
        // })
        
        Team_upUsers.find(filter, function(err, Team_upUser){
            var activityList = []
            
            var newActivity = {
            "Name": req.body.activityName,
            "type": req.body.type,
            "description": req.body.description,
            "location": req.body.location,
            "time": req.body.time // TODO parse time
            }
            for(var i=0; i<Team_upUser[0].activities.length; i++){
                activityList.push(Team_upUser[0].activities[i])
            }
            
            activityList.push(newActivity)
            // console.log(Team_upUser[0].activities)
            // console.log("activity list inside q: ", aactivityList)
            
            var update = {
                activities: activityList
            }
            
            Team_upUsers.findOneAndUpdate(filter,update,function(err,doc){
                console.log("successfully updated")
            })
        })
        
        activityfilter = {"Name": req.body.activityName}
        
        Team_upActivities.find(activityfilter, function(err, Team_upActivity){
            if (Team_upActivity.length){
                console.log("Activity already exists")
                res.redirect("/home")
            }
            
            new Team_upActivities({
                "Name": req.body.activityName,
                "type": req.body.type,
                "description": req.body.description,
                "location": req.body.location,
                "time": req.body.time // TODO parse time
            }).save(function(err, a){
                if(err) return res.send(500, "Error occured: database error")
                // res.json({id:a._id})
            })
            console.log("Successfully made activity")
        })
        
        res.redirect('/home')
    }
})


app.get('/process-logout', function(req,res){
    var userCookie = req.cookies
    if (userCookie.userEmail == null){
        // res.json({})
        console.log("not logged in")
        res.sendFile(frontEndPath+'/index.html');
    }
    res.clearCookie('userEmail')
    res.sendFile(frontEndPath+'/index.html');
    
})

userConnectionString = credentials.mongo.db.usersconnectionString
mongoose.connect(userConnectionString)



app.post('/process-login', function(req,res){
    
    // user_details = {
        // 'email': req.body.email,
        // 'password': req.body.password
    // }
    
    // try{
        // var login_check = user_login(Team_upUsers,user_details)
        // console.log("login_check",login_check)
        // if (login_check){
            // res.redirect('/home')
        // }
        // else{
            // res.redirect('/incorrectLogin')
        // }
    // }
    // catch(e){
        // res.redirect('/incorrectLogin')
        // console.log(e)
    // }
    
    Team_upUsers.find({email: req.body.email}, function(err, Team_upUser){
        // console.log(Team_upUser)
        if ((Team_upUser == null) || (Team_upUser.length == 0)){
            console.log("user doesn't exist")
            res.redirect('/incorrectLogin')
        }
        else if(passwordEncrypter.comparePassword(req.body.password,Team_upUser[0].password)){
            console.log("login successful")
            //TODO add cookie for successful login
            res.cookie("userEmail",req.body.email,{maxAge:360000})
            res.redirect('/home')
            
            // res.write("<h1>Welcome to the home page</h1>")
        }
        else{
            // var print = document.getElementById('incorrectPassword');
            // var text = document.createTextNode('incorrect username or password');
            // print.appendChild(text);
            
            res.redirect('/incorrectLogin')
            
        }
        
        // if (err){
            // //TODO handle error
            // //console.log(err);
            // return;
        // }
    })
    // catch(error){
        // res.redirect('/incorrectLogin')
        // console.log(error)
    // }
    // TODO catch err
    
})
var user_login = function(Team_upUsers,user_details){
    var check = false
    Team_upUsers.find({email: user_details.email}, function(err, Team_upUser){
        
        if (err){
            console.log(err)
            return
        }
        if(Team_upUser.length == 0){
            console.log("user doesn't exist")
            return
        }
        if(passwordEncrypter.comparePassword(user_details.password,Team_upUser[0].password)){
            console.log("login successful")
            //TODO add cookie for successful login
            // res.redirect('/home')
            check = true
            // res.write("<h1>Welcome to the home page</h1>")
        }
        // else{
            // // var print = document.getElementById('incorrectPassword');
            // // var text = document.createTextNode('incorrect username or password');
            // // print.appendChild(text);
            // check = false
            // // res.redirect('/incorrectLogin')
            
        // }
        
        // if (err){
            // //TODO handle error
            // //console.log(err);
            // return;
        // }
    })
    
    return check
}
app.post('/process-signup', function(req,res){
    //TODO use class instead
    
    // console.log(req.body.email)
    Team_upUsers.find({email: req.body.email}, function(err, Team_upUser){
        if (err){
            //TODO handle error
            console.log(err);                     
            return;
        }
        
        if (Team_upUser.length){
            //TODO write error to screen
            console.log("user aleady exists");
            //return maybe?
            return;
        }
        
        var encryptedPassword = passwordEncrypter.encryptPassword(req.body.password)
        
        
        new Team_upUsers({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: encryptedPassword, //TODO encript password
            phone: "",
            street: "",
            city: "",
            state: "",
            zipcode: "",
            activity: "",
        }).save(function(err, a){
            if(err) return res.send(500, "Error occured: database error")
            res.json({id:a._id})
        })
        console.log("success!")
        // TODO catch err
    })
    
    
    
})

app.post('upload-activty', function(req,res){
    //TODO
    
})

app.get('/incorrectLogin', function(req,res){
    res.sendFile(frontEndPath+'/indexIncorrect.html') //TODO fix
})
app.use(function(req, res){
	
	res.status(404)
	res.send('404')
})


app.use(function(err, req, res, next){
	console.error(err.stack)
	res.status(500)
	res.send("500")
})

app.listen(app.get("port"), function(){
	console.log("server running")
})

// class login-signup{
	
	// var authenticate-signup = function(){
		// // process signup
	// }
	
	// var authenticate-login = function(){
		// // process login
	// }
	
	// var get-preference = function(){
		// // get user preference
	// }
	
	// var go-to-homepage = function(){
		// // go to homepage
	// }
// }



// class Database_Manager{
	// var create_db_connection = function(){
		// // connect to database
	// }
	// var close_db_connection = function(){
		// // close database connection
	// }
	
	// var retrive_data = function(){
		// // retrives data
	// }
	
	// var send_data = function(){
		// // sends data
	// }
// }

// class Homepage{
	// var show-groups = function(){
		// // show user groups
	// }
	
	// var get-user-preferences = function(){
		// // get user preferences
	// }
	
	// var log-out = function(){
		// // get activites data
	// }
	
	// var login-signup = function(){
		// // show login/signup page
	// }
	
	
// }

// }
// class Groups{
	// var create-chat-room = function(){
		// // create chat room
	// }
	
	// var close-chat-room = function(){
		// // close chat room
	// }
	
	// var go-to-homepage = function(){
		// //TODO
	// }
	
// }


// class Chat-Room{
	// var create-chat-room = function(){
		// // create chat room
	// }
	
	// var close-chat-room = function(){
		// // close chat room
	// }
	
	// var send-chat-data = function(){
		// // send chat data
	// }
	
	// var retrive-chat-data = function(){
		// // retrieve chat data
	// }
// }

// class Chat-Manager{
	// var create_db_connection = function(){
		// // connect to database
	// }
	// var close_db_connection = function(){
		// // close database connection
	// }
	
	// var retrive_data = function(){
		// // retrives data
	// }
	
	// var send_data = function(){
		// // sends data
	// }
// }


// class User-preferences{
	// class Sort-Activities{
		// var sort-activites = function(){
			// // sort activites
		// }
		
		// var get_activities = function(){
			// //TODO
		// }
		
		// var sort-location = function(){
			// // sort location
		// }
		// var sort-time = function(){
			// // sort time
		// }
	// }
	
	// class Search-Activities{
		// var search-activites = function(){
			// // search activities
		// }
		// var search-groups = function(){
			// // search groups
		// }
	// }
// }


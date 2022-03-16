//TODO validate email
// send emails to new users
// change cookie on login and logout
// encript password
// handle errors

var express = require('express')
var app = express()
app.use(express.static(__dirname+'/frontEnd'))
// var fs = require("fs")
var credentials = require("./models/credentials.js")
var passwordEncrypter = require("./models/passwordEncrypter.js")
// var handlebars = require("express-handlebars").create({defaultLayout: "main"})
var Team_upUsers = require("./Team-upSchema.js")
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
    
    res.sendFile(__dirname+'/index.html');
});

app.get('/activties', function(req,res){
    //TODO
    var activties = get_activities();
    
})

userConnectionString = credentials.mongo.db.connectionString
mongoose.connect(userConnectionString)
app.post('/process-login', function(req,res){
    
    
    Team_upUsers.find({email: req.body.email}, function(err, Team_upUser){
        if (err){
            //TODO handle error
            console.log(err);
            return;
        }
        
        if(passwordEncrypter.comparePassword(req.body.password,Team_upUser[0].password)){
            console.log("login successful")
            res.write("<h1>Welcome to the home page</h1>")
        }
        else{
            console.log("incorrect password")
        }
        
        
    })
    //TODO catch err
    
})

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


app.use(function(req, res){
	
	res.status(404)
	res.render('404')
})


app.use(function(err, req, res, next){
	console.error(err.stack)
	res.status(500)
	res.render("500")
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


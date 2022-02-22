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
var get_activities = function(){
    //TODO
    return;
}

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
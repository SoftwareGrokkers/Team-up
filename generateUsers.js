
var credentials = require("./models/credentials.js")
var passwordEncrypter = require("./models/passwordEncrypter.js")
var Team_upUsers = require("./Team-upSchema.js")
var mongoose = require("mongoose");
userConnectionString = credentials.mongo.db.connectionString
mongoose.connect(userConnectionString)
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var request = new XMLHttpRequest();
const url = new URL('https:randomuser.me/api/?nat=us');
var count = 0



var createUser_test = function(Team_upUsers){
    // console.log(data)
    // console.log(console.log(data['results'][0]['name']))
    request.open('GET', url, false)
    request.send()
    data = JSON.parse(request.responseText)
    userPassword = data['results'][0]['name']['last'] + "123";
    console.log(userPassword)
    var encryptedPassword = passwordEncrypter.encryptPassword(userPassword)
    var userEmail = data['results'][0]['name']['first'] + "@" + data['results'][0]['name']['last']
    
    new Team_upUsers({
        firstname: data['results'][0]['name']['first'],
        lastname: data['results'][0]['name']['last'],
        email: data['results'][0]['email'],
        password: encryptedPassword, //TODO encript password
        phone: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        activity: [],
        groups: []
    }).save()
    console.log("saved")
    count += 1
    if (count == 500){
        clearInterval(interval)
    }
}



// var interval = setInterval(createUser_test,500,Team_upUsers)

createUser_test(Team_upUsers)

// console.log("success!!");

var credentials = require("./models/credentials.js")
var passwordEncrypter = require("./models/passwordEncrypter.js")
var Team_upUsers = require("./Team-upSchema.js")
var mongoose = require("mongoose");
userConnectionString = credentials.mongo.db.usersconnectionString
mongoose.connect(userConnectionString)


var count = 0


class userGenerator{
    
    createUser_test(Team_upUsers){
        // console.log(data)
        // console.log(console.log(data['results'][0]['name']))
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        var request = new XMLHttpRequest();
        const url = new URL('https:randomuser.me/api/?nat=us');
        request.open('GET', url, false)
        request.send()
        var userData = JSON.parse(request.responseText)
        var userPassword = userData['results'][0]['name']['last'] + "123";
        console.log(userPassword)
        var encryptedPassword = passwordEncrypter.encryptPassword(userPassword)
        var userEmail = userData['results'][0]['name']['first'] + "@" + userData['results'][0]['name']['last']
        
        new Team_upUsers({
            firstname: userData['results'][0]['name']['first'],
            lastname: userData['results'][0]['name']['last'],
            email: userData['results'][0]['email'],
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
}



// var interval = setInterval(createUser_test,500,Team_upUsers)

generateUser = new userGenerator()
generateUser.createUser_test(Team_upUsers)

// console.log("success!!");
//TODO validate email
// send emails to new users
// change cookie on login and logout
// encript password
// handle errors


frontEndPath = __dirname+'/frontEnd'
const mongoose = require('mongoose')
const credentials = require("./models/credentials.js")
const passwordEncrypter = require("./models/passwordEncrypter.js")
// var handlebars = require("express-handlebars").create({defaultLayout: "main"})
// app.engine("handlebars", handlebars.engine)
// app.set("view engine", "handlebars")


const path = require('path')

class server{
    
	create_db_connection(mongoose,credentials) {
		const userConnectionString = credentials.mongo.db.usersconnectionString
        mongoose.connect(userConnectionString)
	}
    create_and_initilize_router(){
        const express = require('express')

        const session = require('express-session');
        const cookieParser = require('cookie-parser');
        const flash = require('connect-flash')
        
        const router = express()
        router.use(cookieParser('secret')); //TODO move to models
        router.use(session({cookie: { maxAge: 900000 }}));
        router.use(flash());
        router.use(express.static(__dirname+'/frontEnd')) //TODO figure this out
        router.use(require("body-parser")());
        router.set('port', process.env.port || 3000)
        return router
    }
    create_and_initialize_Team_upUsers(){
        const Team_upUsers = require("./Team-upSchema.js")
        return Team_upUsers
    }
    create_and_initialize_Team_upActivities(){
        const Team_upActivities = require("./ActivitiesSchema.js")
        return Team_upActivities
    }
    create_and_initialize_Team_upGroups(){
        const Team_upGroups = require("./GroupsSchema.js")
        return Team_upGroups
    }
    
	// var close_db_connection = function(){
		// // close database connection
	// }
	
	// var retrive_data = function(){
		// // retrives data
	// }
	
	// var send_data = function(){
		// // sends data
	// }
}

// class activityCreator{
    // createActivity(){
        
    // }
// }




// Kathan wuz here :) lol
const creatorClass = new server();
creatorClass.create_db_connection(mongoose,credentials)
app = creatorClass.create_and_initilize_router()
const Team_upUsers = creatorClass.create_and_initialize_Team_upUsers()
const Team_upActivities = creatorClass.create_and_initialize_Team_upActivities()
const Team_upGroups = creatorClass.create_and_initialize_Team_upGroups()
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


app.get('/openGroupPage*', function(req,res){
    
    // console.log(req.params)
    // console.log(req.query)
    // console.log(res)
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        res.redirect('/')
        console.log("not logged in")
    }
    else{
        res.cookie("groupName",req.query.groupName,{maxAge:900000})
        res.sendFile(frontEndPath+'/groupPage.html');
    }
})

app.get('/openHomeGroupPage*', function(req,res){
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        res.redirect('/')
        console.log("not logged in")
    }
    else{
        res.cookie("groupName",req.query.groupName,{maxAge:900000})
        res.sendFile(frontEndPath+'/leavegroupPage.html');
    }
})

app.get('/openActivityPage*', function(req,res){
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        res.redirect('/')
        console.log("not logged in")
    }
    else{
        res.cookie("activityName",req.query.activityName,{maxAge:900000})
        res.sendFile(frontEndPath+'/activityPage.html');
    }
})

///////////////////////////////
app.get('/openHomeActivityPage*', function(req,res){
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        res.redirect('/')
        console.log("not logged in")
    }
    else{
        res.cookie("activityName",req.query.activityName,{maxAge:900000})
        res.sendFile(frontEndPath+'/leaveactivityPage.html');
    }
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


app.get('/userGroupPage', function(req,res){
    var groupCookie = req.cookies
    
    if (groupCookie.userEmail == null){
        res.redirect("/")
        console.log("not logged in")
    }
    
    var filter = {"Name":groupCookie.groupName}
    
    Team_upGroups.find(filter, function(err,Team_upGroup){
        res.json(Team_upGroup[0])
    })
})


app.get('/userActivityPage', function(req,res){
    var activityCookie = req.cookies
    
    if(activityCookie.userEmail == null){
        res.redirect("/")
        console.log("not logged in")
    }
    
    var filter = {"Name":activityCookie.activityName}
    
    Team_upActivities.find(filter, function(err,Team_upActivity){
        res.json(Team_upActivity[0])
    })
})

app.get('/userPreferences', function(req,res){
    
    class userPreferences {
      constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
      }

      clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
      }

      delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
      }

      appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
      }

      chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
          this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
      }

      compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
          case '+':
            computation = prev + current
            break
          case '-':
            computation = prev - current
            break
          case '*':
            computation = prev * current
            break
          case '÷':
            computation = prev / current
            break
          default:
            return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
      }

      getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

      updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerText = ''
        }
      }
    }

    res.sendFile(frontEndPath+'/eegg.html');
    // const numberButtons = document.querySelectorAll('[data-number]')
    // const operationButtons = document.querySelectorAll('[data-operation]')
    // const equalsButton = document.querySelector('[data-equals]')
    // const deleteButton = document.querySelector('[data-delete]')
    
    
    // const allClearButton = document.querySelector('[data-all-clear]')
    // const previousOperandTextElement = document.querySelector('[data-previous-operand]')
    // const currentOperandTextElement = document.querySelector('[data-current-operand]')

    // const calculator = new userPreferences(previousOperandTextElement, currentOperandTextElement)

    numberButtons.forEach(button => {
      button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
      })
    })

    operationButtons.forEach(button => {
      button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
      })
    })

    equalsButton.addEventListener('click', button => {
      calculator.compute()
      calculator.updateDisplay()
    })
    
    
    

    allClearButton.addEventListener('click', button => {
      calculator.clear()
      calculator.updateDisplay()
    })

    deleteButton.addEventListener('click', button => {
      calculator.delete()
      calculator.updateDisplay()
    })
    
    
    function parseTime(time, format, step) {
	
	var hour, minute, stepMinute,
		defaultFormat = 'g:ia',
		pm = time.match(/p/i) !== null,
		num = time.replace(/[^0-9]/g, '');
	
	// Parse for hour and minute
	switch(num.length) {
        
        
		case 4:
			hour = parseInt(num[0] + num[1], 10);
			minute = parseInt(num[2] + num[3], 10);
			break;
            
		case 3:
        
			hour = parseInt(num[0], 10);
			minute = parseInt(num[1] + num[2], 10);
			break;
            
		case 2:
        
        
		case 1:
			hour = parseInt(num[0] + (num[1] || ''), 10);
			minute = 0;
			break;
            
            
		default:
			return '';
	}
	
	// Make sure hour is in 24 hour format
	if( pm === true && hour > 0 && hour < 12 ) hour += 12;
	
	// Force pm for hours between 13:00 and 23:00
	if( hour >= 13 && hour <= 23 ) pm = true;
	
	// Handle step
	if( step ) {
		// Step to the nearest hour requires 60, not 0
        
        
		if( step === 0 ) step = 60;
		// Round to nearest step
		stepMinute = (Math.round(minute / step) * step) % 60;
        
        
		// Do we need to round the hour up?
		if( stepMinute === 0 && minute >= 30 ) {
            
            
            
			hour++;
			// Do we need to switch am/pm?
			if( hour === 12 || hour === 24 ) pm = !pm;
		}
		minute = stepMinute;
	}
	
	// Keep within range
	if( hour <= 0 || hour >= 24 ) hour = 0;
	if( minute < 0 || minute > 59 ) minute = 0;

	// Format output
	return (format || defaultFormat)
		// 12 hour without leading 0
        .replace(/g/g, hour === 0 ? '12' : 'g')
        
        
		.replace(/g/g, hour > 12 ? hour - 12 : hour)
		// 24 hour without leading 0
        
        
		.replace(/G/g, hour)
		// 12 hour with leading 0
		.replace(/h/g, hour.toString().length > 1 ? (hour > 12 ? hour - 12 : hour) : '0' + (hour > 12 ? hour - 12 : hour))
        
        
		// 24 hour with leading 0
		.replace(/H/g, hour.toString().length > 1 ? hour : '0' + hour)
        
        
		// minutes with leading zero
		.replace(/i/g, minute.toString().length > 1 ? minute : '0' + minute)
		// simulate seconds
		.replace(/s/g, '00')
		// lowercase am/pm
        
        
		.replace(/a/g, pm ? 'pm' : 'am')
		// lowercase am/pm
		.replace(/A/g, pm ? 'PM' : 'AM');
    }

    var tests = [
      '1:00 pm','1:00 p.m.','1:00 p','1:00pm','1:00p.m.','1:00p','1 pm',
      '1 p.m.','1 p','1pm','1p.m.', '1p', '13:00','13', '1a', '12', '12a', '12p', '12am', '12pm', '2400am', '2400pm', '2400', 
      '1000', '100', '123', '2459', '2359', '2359am', '1100', '123p',
      '1234', '1', '9', '99', '999', '9999', '99999', '0000', '0011', '-1', 'mioaw' ];



    for ( var i = 0; i < tests.length; i++ ) {
      console.log( tests[i].padStart( 9, ' ' ) + " = " + parseTime(tests[i]) );
    }
    
    
})
app.get('/allActivities', function(req,res){
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
    Team_upActivities.find({}, function(err,Team_upActivity){
        // console.log(Team_upUser[0]['activities'])
        // console.log("activity: ",Team_upUser[0].activities)
        res.json(Team_upActivity)
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


app.get('/allGroups', function(req,res){
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
    Team_upGroups.find({}, function(err,Team_upGroup){
        // console.log(Team_upUser[0]['activities'])
        // console.log("activity: ",Team_upUser[0].activities)
        res.json(Team_upGroup)
    })
    
})



app.get('/joinGroup', function(req,res){
    var groupCookie = req.cookies
    
    Team_upGroups.find({"Name":groupCookie.groupName}, function(err, Team_upGroup){
        var group = Team_upGroup[0]
        
        Team_upUsers.find({email:groupCookie.userEmail}, function(err,Team_upUser){
            var groupList = []
            
            var newgroup = {
            "Name": group.Name,
            "type": group.type,
            "description": group.description,
            "creator": groupCookie.userEmail
            }
            
            for(var i=0; i<Team_upUser[0].groups.length; i++){
                groupList.push(Team_upUser[0].groups[i])
            }
            
            groupList.push(newgroup)
            
            var update = {
                groups: groupList
            }
            
            var filter = {"email":groupCookie.userEmail}
            
            Team_upUsers.findOneAndUpdate(filter,update,function(err,doc){
                console.log("successfully updated")
            })
        })
    })
    
    res.redirect("/home")
})


app.get('/leaveGroup', function(req,res){
    var groupCookie = req.cookies
    
    Team_upGroups.find({"Name":groupCookie.groupName}, function(err, Team_upGroup){
        var group = Team_upGroup[0]
        
        Team_upUsers.find({email:groupCookie.userEmail}, function(err, Team_upUser){
            var groupList = []
            
            for (var i = 0; i<Team_upUser[0].groups.length; i++){
                if(Team_upUser[0].groups[i].Name != group.Name){
                    groupList.push(Team_upUser[0].groups[i])
                }
            }
            
            
            var update = {
                groups: groupList
            }
            
            var filter = {"email":groupCookie.userEmail}
            
            Team_upUsers.findOneAndUpdate(filter,update,function(err,doc){
                console.log("successfully updated")
                
                // if(groupCookie.userEmail == group.creator){
                    // var groupfilter = {"Name": group.Name}
                    
                    // Team_upGroups.deleteMany(groupfilter, function(err,doc){
                        // console.log("successfully deleted")
                    // })
                // }
            })
            
            
            
        })
        
        
    })
    res.clearCookie('groupName')
    res.redirect("/home")
})


app.get('/joinActivity', function(req,res){
    var activityCookie = req.cookies
    
    Team_upActivities.find({"Name":activityCookie.activityName}, function(err, Team_upActivity){
        var activity = Team_upActivity[0]
        
        Team_upUsers.find({email:activityCookie.userEmail}, function(err, Team_upUser){
            var activityList = []
            
            var newActivity = {
            "Name": activity.Name,
            "type": activity.type,
            "description": activity.description,
            "location": activity.location,
            "time": activity.time, // TODO parse time
            "creator": activityCookie.userEmail
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
            
            var filter = {"email":activityCookie.userEmail}
            
            Team_upUsers.findOneAndUpdate(filter,update,function(err,doc){
                console.log("successfully updated")
            })
        })
    })
    
    res.redirect("/home")
})




app.get('/leaveActivity', function(req,res){
    var activityCookie = req.cookies
    
    Team_upActivities.find({"Name":activityCookie.activityName}, function(err, Team_upActivity){
        var activity = Team_upActivity[0]
        
        Team_upUsers.find({email:activityCookie.userEmail}, function(err, Team_upUser){
            var activityList = []
            
            for(var i=0; i<Team_upUser[0].activities.length; i++){
                if(Team_upUser[0].activities[i].Name != activity.Name){
                    activityList.push(Team_upUser[0].activities[i])
                }
            }
            
            var update = {
                activities: activityList
            }
            
            var filter = {"email":activityCookie.userEmail}
            
            Team_upUsers.findOneAndUpdate(filter,update,function(err,doc){
                console.log("successfully updated")
                
                
                // if(activityCookie.userEmail == activity.creator){
                    // var activityfilter = {"Name": activity.Name}
                    
                    // Team_upActivities.deleteMany(activityfilter, function(err,doc){
                        // console.log("successfully deleted")
                    // })
                // }
            })
        })
    })
    res.clearCookie('activityName')
    res.redirect("/home")
})



app.get('/searchGroupsAndActivitiesPage', function(req,res){
    var userCookie = req.cookies
    
    
    if (userCookie.userEmail == null){
        // res.json({})
        console.log("not logged in")
        res.sendFile(frontEndPath+'/index.html');
    }
    else{
        res.sendFile(frontEndPath+'/search.html')
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
        var checkexist = {"Name":req.body.groupName}
        // Team_upGroups.find(checkexist,function(err,Team_upGroup){
            // if (Team_upGroup.length > 0){
                // res.redirect("/createGroupsAndActivitiesPage")
            // }
        // })
        Team_upUsers.find(filter, function(err, Team_upUser){
            var groupList = []
            
            var newgroup = {
            "Name": req.body.groupName,
            "type": req.body.type,
            "description": req.body.description,
            "creator": userCookie.userEmail
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
            "description": req.body.description,
            "creator": userCookie.userEmail
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
            "time": req.body.time, // TODO parse time
            "creator": userCookie.userEmail
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
                "time": req.body.time, // TODO parse time
                "creator": userCookie.userEmail
            }).save(function(err, a){
                if(err) return res.send(500, "Error occured: database error")
                // res.json({id:a._id})
            })
            console.log("Successfully made activity")
        })
        
        res.redirect('/home')
    }
})


app.get('/terms_and_cond', function(req,res){
    var userCookie = req.cookies
    if (userCookie.userEmail == null){
        // res.json({})
        console.log("not logged in")
        res.sendFile(frontEndPath+'/index.html');
    }
    res.sendFile(frontEndPath+'/eegg2.html')
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
            res.cookie("userEmail",req.body.email,{maxAge:900000})
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
            res.cookie("userEmail",req.body.email,{maxAge:900000})
            res.sendFile(frontEndPath+'/home.html');
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


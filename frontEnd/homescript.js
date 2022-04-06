// Open and close nav bar
const navBtn = document.getElementById("navBtn");
const navFull = document.getElementById("navFull");
const navClose = document.getElementById("navClose");

navBtn.addEventListener("click", () => {
  navFull.classList.add("showNav");
});

navClose.addEventListener("click", () => {
  navFull.classList.remove("showNav");
});


// Loop through groups and add square boxes
// console.log(document.cookie);
var getUserCookie = function(){
    rawCookie = document.cookie
    goodCookie = rawCookie.replace("%40","@")
    return goodCookie
    
}

var userCookie = getUserCookie()
var request = new XMLHttpRequest();
const userGroupsUrl = `http://localhost:3000/userGroups?cookie=${userCookie}`
const userActivitiesUrl = `http://localhost:3000/userActivities?cookie=${userCookie}`
request.open('GET',userGroupsUrl,false)
request.send()
// console.log(request.responseText)
var groupsData = JSON.parse(request.responseText);
var request = new XMLHttpRequest();
request.open('GET',userActivitiesUrl,false)
request.send()

var activitiesData = JSON.parse(request.responseText)
// var groupsData = [{ "Name": "CSC 3380", "description": "Hello" }, { "Name": "Soccer", "description": "hello soccer" }, {}]

for (let i = 0; i < groupsData.length; i++) {
  var allGroupsDiv = document.getElementById('groups');
  var groupdiv = document.createElement('div');
  var link = document.createElement('a');
  
  // link.href = "/openGroupPage?groupName=${groupsData[i].Name}"
  link.href = "/openGroupPage"
  
  groupdiv.classList.add('group');

  var groupName = document.createElement("h1");
  var groupDescription = document.createElement("p")

  groupName.appendChild(document.createTextNode(groupsData[i].Name));
  groupDescription.appendChild(document.createTextNode(groupssData[i].description))

  groupdiv.appendChild(groupName);
  groupdiv.appendChild(groupDescription)
  link.appendChild(groupdiv)
  allGroupsDiv.appendChild(link);
}

for (let i = 0; i < activitiesData.length; i++) {
  var allGroupsDiv = document.getElementById('activities');
  var groupdiv = document.createElement('div');
  var link = document.createElement('a')
  
  // link.href = "/openActivityPage?activityName=${activitiesData[i].Name}"
  link.href = "/openActivityPage"
  
  groupdiv.classList.add('activity');

  var groupName = document.createElement("h1");
  var groupDescription = document.createElement("p")

  groupName.appendChild(document.createTextNode(activitiesData[i].Name));
  groupDescription.appendChild(document.createTextNode(activitiesData[i].description))

  groupdiv.appendChild(groupName);
  groupdiv.appendChild(groupDescription)
  link.appendChild(groupdiv)
  allGroupsDiv.appendChild(link);
}

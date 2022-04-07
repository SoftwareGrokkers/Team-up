// Open and close nav bar
function openNav() {
  document.getElementById("myNavFull").style.width = "125px";
}

function closeNav() {
  document.getElementById("myNavFull").style.width = "0";
}

function dropMenu() {
  document.getElementById("myDropdown").classList.toggle("show");
}

var getActivityCookie = function(){
    Cookies = document.cookie.split(";")
    groupCookie = Cookies[1]
    goodCookie = groupCookie.replace("%20", " ")
    return goodCookie
}

var activityCookie = getActivityCookie()

var request = new XMLHttpRequest();
const userActivitiesUrl = `http://localhost:3000/userActivityPage?cookie=${activityCookie}`
request.open('GET', userActivitiesUrl,false)
request.send()

try{
    var activityData = JSON.parse(request.responseText);
    console.log(activityData)
}
catch(error){
    var activityData = {Name: "Football Game", type : "Sport", description: "its a sport", creator: "John Smith", location: "Baton Rouge", time: "12 PM"}
}

var activityInfo = document.getElementById('activityInfo')
var activityName = document.createElement("h1");
var activitytype = document.createElement("h3")
var activityDescription = document.createElement("p")
var activityCreator = document.createElement("p")
var activityLocation = document.createElement("h2")
var activityTime = document.createElement("h2")

activityName.appendChild(document.createTextNode(activityData.Name));
activitytype.appendChild(document.createTextNode(activityData.type));
activityLocation.appendChild(document.createTextNode(activityData.location))
activityTime.appendChild(document.createTextNode(activityData.time))
activityDescription.appendChild(document.createTextNode(activityData.description));
activityCreator.appendChild(document.createTextNode("Creator: " + activityData.creator));

activityInfo.appendChild(activityName)
activityInfo.appendChild(activityLocation)
activityInfo.appendChild(activityTime)
activityInfo.appendChild(activitytype)
activityInfo.appendChild(activityDescription)
activityInfo.appendChild(activityCreator)


var join = document.getElementsByClassName("button")[0];
join.addEventListener("click", joinGroup)

function joinGroup() {
  // TODO
}

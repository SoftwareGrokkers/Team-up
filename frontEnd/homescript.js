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
  
// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function filterSelection(c)
{
  var ul, liG;
  ul = document.getElementById("groups");
  liG = ul.getElementsByClassName('group');
  liA = ul.getElementsByClassName('activity');

  if (c == "All") c = "";
    for (i = 0; i < liG.length; i++) {
      if (liG[i].className.indexOf(c) > -1) {
        liG[i].style.display = "";
      } 
      else {
        liG[i].style.display = "none";
      }
    }

    if (c == "All") c = "";
    for (i = 0; i < liA.length; i++) {
      if (liA[i].className.indexOf(c) > -1) {
        liA[i].style.display = "";
      } 
      else {
        liA[i].style.display = "none";
      }
    }
}


function groupFilterSelection(c) 
  {
    var ul, liG;
    ul = document.getElementById("groups");
    liG = ul = ul.getElementsByClassName('group');

    if (c == "All") c = "";
    for (i = 0; i < liG.length; i++) {
      if (liG[i].className.indexOf(c) > -1) {
        liG[i].style.display = "";
      } 
      else {
        liG[i].style.display = "none";
      }
    }
  }

  function activityFilterSelection(c) 
  {
    var ul, liA;
    ul = document.getElementById("groups");
    liA = ul = ul.getElementsByClassName('activity');

    if (c == "All") c = "";
    for (i = 0; i < liA.length; i++) {
      if (liA[i].className.indexOf(c) > -1) {
        liA[i].style.display = "";
      } 
      else {
        liA[i].style.display = "none";
      }
    }
  }


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
//request.open('GET',userGroupsUrl,false)
//request.send()
// console.log(request.responseText)
//var groupsData = JSON.parse(request.responseText);
var request = new XMLHttpRequest();
request.open('GET',userActivitiesUrl,false)
//request.send()

// var activitiesData = JSON.parse(request.responseText)
 var groupsData = [{ "Name": "CSC 3380", "description": "Hello", "type": "Sports" }, { "Name": "Soccer", "description": "hello soccer" }, {}]

for (let i = 0; i < groupsData.length; i++) {
  var allGroupsDiv = document.getElementById('groups');
  var groupdiv = document.createElement('div');
  var link = document.createElement('a');
  
  link.href = `/openGroupPage?groupName=${groupsData[i].Name}`
  // link.href = "/openGroupPage?"
  
  groupdiv.classList.add('group');

  var groupName = document.createElement("h1");
  //var groupDescription = document.createElement("p")
  var groupType = document.createElement("p");
  groupName.appendChild(document.createTextNode(groupsData[i].Name));
  //groupDescription.appendChild(document.createTextNode(groupsData[i].description));
  groupType.appendChild(document.createTextNode(groupsData[i].type));

  groupdiv.appendChild(groupName);
  //groupdiv.appendChild(groupDescription);
  groupdiv.appendChild(groupType);
  link.appendChild(groupdiv)
  allGroupsDiv.appendChild(link);
}

var activitiesData = [{ "Name": "CSC 3380 Exam", "description": "Hello", "type": "Sports" }, { "Name": "Soccer", "description": "hello soccer" }, {}]

for (let i = 0; i < activitiesData.length; i++) {
  var allGroupsDiv = document.getElementById('groups');
  var groupdiv = document.createElement('div');
  var link = document.createElement('a')
  
  link.href = `/openActivityPage?activityName=${activitiesData[i].Name}`
  // link.href = "/openActivityPage"
  
  groupdiv.classList.add('activity');

  var groupName = document.createElement("h1");
  var groupType = document.createElement("p");
  groupName.appendChild(document.createTextNode(activitiesData[i].Name));
  groupType.appendChild(document.createTextNode(activitiesData[i].type));


  groupdiv.appendChild(groupName);
  groupdiv.appendChild(groupType);
  link.appendChild(groupdiv)
  allGroupsDiv.appendChild(link);
}

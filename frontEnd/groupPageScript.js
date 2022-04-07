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
console.log(document.cookie)
var getGroupCookie = function(){
    Cookies = document.cookie.split(";")
    groupCookie = Cookies[1]
    goodCookie = groupCookie.replace("%20", " ")
    return goodCookie
}
// var getUserCookie = function(){
    // rawCookie = document.cookie
// }
var groupCookie = getGroupCookie()
var request = new XMLHttpRequest();
const userGroupsUrl = `http://localhost:3000/userGroupPage?cookie=${groupCookie}`
request.open('GET', userGroupsUrl, false)
request.send()
try{
    var groupData = JSON.parse(request.responseText);
    console.log(groupData)
}
catch(error){
    var groupData = {Name: "Soccer", type : "Sport", description: "its a sport", creator: "John Smith"}
}
var groupInfo = document.getElementById('groupInfo')
var groupName = document.createElement("h1");
var grouptype = document.createElement("h3")
var groupDescription = document.createElement("p")
var groupCreator = document.createElement("p")

groupName.appendChild(document.createTextNode(groupData.Name));
grouptype.appendChild(document.createTextNode(groupData.type));
groupDescription.appendChild(document.createTextNode(groupData.description));
groupCreator.appendChild(document.createTextNode("Creator: " + groupData.creator));

groupInfo.appendChild(groupName)
groupInfo.appendChild(grouptype)
groupInfo.appendChild(groupDescription)
groupInfo.appendChild(groupCreator)

var join = document.getElementsByClassName("button")[0];
join.addEventListener("click", joinGroup)

function joinGroup() {

  // TODO

}


// Open and close nav bar
function openNav() {
  document.getElementById("myNavFull").style.width = "125px";
}

function closeNav() {
  document.getElementById("myNavFull").style.width = "0";
}
// console.log(document.cookie)
class groupPage{
    getGroupCookie(docuement){
        var Cookies = document.cookie.split(";")
        var groupCookie = Cookies[1]
        var goodCookie = groupCookie.replace("%20", " ")
        return goodCookie
    }
    addMessagePrototype(){
        var activityDescription = document.createElement("p")
var activityCreator = document.createElement("p")
var activityLocation = document.createElement("h2")
var activityTime = document.createElement("h2")
    }
    printGroupInfo(groupCreator,groupDescription,groupName,grouptype){
        var activityInfo = document.getElementById('activityInfo')
var activityName = document.createElement("h1");
var activitytype = document.createElement("h3")
    }
    
}

class messagePrototype{
    #inputText;
    #sampleMessage
    MessagePrototype(input,div){
        var Cookies = document.cookie.split(";")
        var groupCookie = Cookies[1]
        var goodCookie = groupCookie.replace("%20", " ")
        return goodCookie
    }
}

class _groupInfo{
    #groupCreator
    #groupDescription
    #groupName
    #groupType
}

class _joinGroup{
    joinButton(){
        //
    }
    linkGroup(){
        //
    }
}
// var getUserCookie = function(){
    // rawCookie = document.cookie
// }
gppage = new groupPage()
var groupCookie = gppage.getGroupCookie(document)
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



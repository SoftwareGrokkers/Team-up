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
console.log(document)
var request = new XMLHttpRequest();
request.open('GET', "#")
request.send()
try{
    var groupData = JSON.parse(request.responseText);
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


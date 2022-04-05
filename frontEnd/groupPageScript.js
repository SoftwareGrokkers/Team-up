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

var request = new XMLHttpRequest();
request.open('GET', "#")

request.send()

//var groupData = JSON.parse(request.responseText);
var groupData = {Name: "Soccer", type : "sport"}

var groupName = document.createElement("h1");
groupName.appendChild(document.createTextNode(groupsData.Name));


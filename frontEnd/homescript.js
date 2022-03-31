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
// var groupsData = [{ "Name": "CSC 3380", "description": "Hello" }, { "Name": "Soccer", "description": "hello soccer" }, {}]

// for (let i = 0; i < groupsData.length; i++) {
//   var allGroupsDiv = document.getElementById('groups');
//   var groupdiv = document.createElement('div');
//   groupdiv.classList.add('group');
//   allGroupsDiv.appendChild(groupdiv);
// }

const navBtn = document.getElementById("navBtn");
const navFull = document.getElementById("navFull");
const navClose = document.getElementById("navClose");

navBtn.addEventListener("click", () => {
    navFull.classList.add("showNav");
});

navClose.addEventListener("click", () => {
    navFull.classList.remove("showNav");
});

var createGroup = document.getElementById("createGroup");
var createActivity = document.getElementById("createActivity");
var buttons = document.getElementById("buttons");

function pullCreateGroup() {
    createGroup.style.left = "-22.5em";
    createActivity.style.left = "0.5em";
    buttons.style.left = "110px";
}

function pullCreateActivity() {
    createGroup.style.left = "0.5em";
    createActivity.style.left = "23em";
    buttons.style.left = "0";
}
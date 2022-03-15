const signUpButton = document.getElementById('signUpTransition');
const signInButton = document.getElementById('logInTransition');
const box = document.getElementById('box');

signUpButton.addEventListener('click', () => {
	box.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	box.classList.remove("right-panel-active");
});
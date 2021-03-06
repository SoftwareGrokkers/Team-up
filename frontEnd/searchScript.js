// Drop Down menu
function toggleClass(elem,className){
	if (elem.className.indexOf(className) !== -1){
		elem.className = elem.className.replace(className,'');
	}
	else{
		elem.className = elem.className.replace(/\s+/g,' ') + 	' ' + className;
	}
	
	return elem;
}

function toggleDisplay(elem){
	const curDisplayStyle = elem.style.display;			
				
	if (curDisplayStyle === 'none' || curDisplayStyle === ''){
		elem.style.display = 'block';
	}
	else{
		elem.style.display = 'none';
	}
}

function toggleMenuDisplay(e){
	const dropdown = e.currentTarget.parentNode;
	const menu = dropdown.querySelector('.menu');
	const icon = dropdown.querySelector('.fa-angle-right');

	toggleClass(menu,'hide');
	toggleClass(icon,'rotate-90');
}

function handleOptionSelected(e){
	toggleClass(e.target.parentNode, 'hide');			

	const id = e.target.id;
	const newValue = e.target.textContent + ' ';
	const titleElem = document.querySelector('.dropdown .title');
	const icon = document.querySelector('.dropdown .title .fa');


	titleElem.textContent = newValue;
	titleElem.appendChild(icon);
	
	document.querySelector('.dropdown .title').dispatchEvent(new Event('change'));

	setTimeout(() => toggleClass(icon,'rotate-90',0));
}

function handleTitleChange(e){
  if (e.target.textContent === "Groups "){
    searchResultsDiv.innerHTML = "";

    var groupsSearch = new XMLHttpRequest();
    groupsSearch.open('GET', '#');
    
    groupsSearch.onload = function () {
      if (groupsData.length == 0) {
        console.log("Add a group");
      }
      else {
        for (let i = 0; i < groupsData.length; i++) {
          var resultDiv = document.createElement("div");
          resultDiv.classList.add("result");
          resultDiv.id = groupsData[i].Name;
    
          var groupName = document.createElement("h1");
          groupName.appendChild(document.createTextNode(groupsData[i].Name));
    
          resultDiv.appendChild(groupName);
          searchResultsDiv.appendChild(resultDiv);
        }
      }
    };
    
    groupsSearch.send();

    searchInput.addEventListener("input", searchAlgorithm);
  }

  else if(e.target.textContent === "Activities ") {
    searchResultsDiv.innerHTML = "";

    var activitiesSearch = new XMLHttpRequest();
    activitiesSearch.open('GET', '#');

    activitiesSearch.onload = function () {
      if (activitiesData.length == 0) {
        console.log("Add a group");
      }
      else {
        for (let i = 0; i < activitiesData.length; i++) {
          var resultDiv = document.createElement("div");
          resultDiv.classList.add("result");
          resultDiv.id = activitiesData[i].Name;
    
          var activityName = document.createElement("h1");
          activityName.appendChild(document.createTextNode(activitiesData[i].Name));
    
          resultDiv.appendChild(activityName);
          searchResultsDiv.appendChild(resultDiv);
        }
      }
    };
    
    activitiesSearch.send();

    searchInput.addEventListener("input", searchAlgorithmActivities);
  }

}


//Dropdown for groups or activities
const dropdownTitle = document.querySelector('.dropdown .title');
const dropdownOptions = document.querySelectorAll('.dropdown .option');

dropdownTitle.addEventListener('click', toggleMenuDisplay);

dropdownOptions.forEach(option => option.addEventListener('click', handleOptionSelected));
document.querySelector('.dropdown .title').addEventListener('change', handleTitleChange);

// // Dropdown for sort
// const dropdownTitle = document.querySelector('.dropdown .title');
// const dropdownOptions = document.querySelectorAll('.dropdown .option');

// dropdownTitle.addEventListener('click', toggleMenuDisplay);
// dropdownOptions.forEach(option => option.addEventListener('click',handleOptionSelected));
// document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);


///////////////////////////////////////////////////////////////////////


// Search Function
var searchResultsDiv = document.getElementById('searchResults');
var searchInput = document.getElementById("searchBar")



var groupsData = [
  { Name: "CSC 3380", description: "Hello" },
  { Name: "Soccer", description: "hello soccer" },
  { Name: "CSC 4103", description: "hello soccer" },
  { Name: "Csc 2262", description: "hello soccer" },
  { Name: "football", description: "hello soccer" },
  { Name: "tennis", description: "hello soccer" },
  { Name: "tesfddfannis", description: "hello soccer" },
];
// var groupsData = JSON.parse(groupsSearch.responseText);

function searchAlgorithm(e) {
  const text = e.target.value.toLowerCase();
  for (let i = 0; i < groupsData.length; i++) {
    const visible = groupsData[i].Name.toLowerCase().includes(text);

    var hideDiv = document.getElementById(groupsData[i].Name);

    if (!visible) {
      var hideDiv = document.getElementById(groupsData[i].Name);
      hideDiv.style.display = "none";
    } else {
      hideDiv.style.display = "block";
    }
  }
}







/////////////////////////////////////////////////////////////

var activitiesData = [
  { Name: "CSC", description: "Hello" },
  { Name: "Soccer", description: "hello soccer" },
  { Name: "CSC 4103", description: "hello soccer" },
  { Name: "Csc 2262", description: "hello soccer" },
  { Name: "football", description: "hello soccer" },
  { Name: "tennis", description: "hello soccer" },
];
// var activitiesData = JSON.parse(groupsSearch.responseText);

// Search Activities

function searchAlgorithmActivities(e) {
  const text = e.target.value.toLowerCase();
  for (let i = 0; i < activitiesData.length; i++) {
    const visible = activitiesData[i].Name.toLowerCase().includes(text);
    console.log(activitiesData[i])
    var hideDiv = document.getElementById(activitiesData[i].Name);
    

    if (!visible) {
      var hideDiv = document.getElementById(activitiesData[i].Name);
      hideDiv.style.display = "none";
    } else {
      hideDiv.style.display = "block";
    }
  }
}
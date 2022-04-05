var groupsSearch = new XMLHttpRequest();
var searchInput = document.getElementById("searchBar")

groupsSearch.open('GET', '#');

groupsSearch.onload = function () {
  var groupsData = JSON.parse(groupsSearch.responseText);
  if (groupsData.length == 0) {
    console.log("Add a group");
  }
  else {
    for (let i = 0; i < groupsData.length; i++) {
      var searchResultsDiv = document.getElementById('searchResults');
      var resultDiv = document.createElement('div');
      resultDiv.classList.add('result');
      
      var groupName = document.createElement("h1");
      groupName.appendChild(document.createTextNode(groupsData[i].Name));

      resultDiv.appendChild(groupName);
      searchResultsDiv.appendChild(resultDiv);
    }
  }
};

groupsSearch.send();

searchInput.addEventListener("input", searchAlgorithm);

function searchAlgorithm(e) {
  const text = e.target.value.toLowerCase();
  for (let i = 0; i < groupsData.length; i++) {
    const visible = groupsData[i].Name.toLowerCase().includes(text);
    console.log(groupsData[i].Name + " " + visible);

    var hideDiv = document.getElementById(groupsData[i].Name);

    if (!visible) {
      var hideDiv = document.getElementById(groupsData[i].Name);
      hideDiv.style.display = "none";
    } 
    else {
        hideDiv.style.display = "block";
    }
  }
}





// Search Activities
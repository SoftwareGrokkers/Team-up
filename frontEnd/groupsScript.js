var groupsHome = new XMLHttpRequest();
groupsHome.open('GET', '#');

ourRequest.onload = function () {
  var groupsData = JSON.parse(groupsHome.responseText);
  if (groupsData.length == 0) {
    console.log("Add a group");
  }
  else {
    for (let i = 0; i < groupsData.length; i++) {
      var allGroupsDiv = document.getElementById('groups');
      var groupdiv = document.createElement('div');
      groupdiv.classList.add('group');
      allGroupsDiv.appendChild(groupdiv);
    }
  }
};

groupsHome.send();
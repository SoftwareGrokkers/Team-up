// Load user groups
var groupsHome = new XMLHttpRequest();
groupsHome.open('GET', '#');

groupsHome.onload = function () {
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


// Load user activities
var activitiesHome = new XMLHttpRequest();
activitiesHome.open('GET', '#');

activitiesHome.onload = function () {
  var activitiesData = JSON.parse(activitiessHome.responseText);
  if (activitiesData.length == 0) {
    console.log("Add an activity");
  }
  else {
    for (let i = 0; i < groupsData.length; i++) {
      var allActivitiesDiv = document.getElementById('activities');
      var activityDiv = document.createElement('div');
      activityDiv.classList.add('activity');
      allActivitiesDiv.appendChild(activityDiv);
    }
  }
};

activitiesHome.send();
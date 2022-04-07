function openNav() {
    document.getElementById("myNavFull").style.width = "125px";
  }
  
  function closeNav() {
    document.getElementById("myNavFull").style.width = "0";
  }
  var modal = document.getElementById('groupMenu');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  var modal = document.getElementById('activityMenu');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
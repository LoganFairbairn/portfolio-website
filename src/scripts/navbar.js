document.getElementById("navbar-button").addEventListener("click", function() {
  var x = document.getElementsByClassName("navbar-links");
  if (x[0].className === "navbar-links") {
    x[0].className += " show";
  } else {
    x[0].className = "navbar-links";
  }
});

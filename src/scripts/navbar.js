document.getElementById("menu-button").addEventListener("click", function() {
  var x = document.getElementsByClassName("site-links");
  if (x[0].className === "site-links") {
    x[0].className = "site-links show";
  } else {
    x[0].className = "site-links";
  }
});

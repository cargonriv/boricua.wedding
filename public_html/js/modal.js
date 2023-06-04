// Get the modals
var registerModal = document.getElementById("on-register-modal");
var loginModal = document.getElementById("on-login-modal");

document.addEventListener("DOMContentLoaded", function () {
  // var registerBtn = document.getElementById("register-btn");
  // var loginBtn = document.getElementById("login-btn");

  var registerSpan = document.getElementsByClassName("close")[0];
  var loginSpan = document.getElementsByClassName("close")[1];

  registerModal.onload = function () {
    registerModal.style.display = "block";
  };

  loginModal.onload = function () {
    loginModal.style.display = "block";
  };

  registerSpan.onclick = function () {
    registerModal.style.display = "none";
  };

  loginSpan.onclick = function () {
    loginModal.style.display = "none";
  };
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
};

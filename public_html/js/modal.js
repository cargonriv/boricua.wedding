// Get the modals
var registerModal = document.getElementById("register-modal");
var loginModal = document.getElementById("login-modal");

document.addEventListener("DOMContentLoaded", function () {
  var registerBtn = document.getElementById("register-btn");
  var loginBtn = document.getElementById("login-btn");

  var registerSpan = document.getElementsByClassName("close")[0];
  var loginSpan = document.getElementsByClassName("close")[1];

  registerBtn.onclick = function () {
    registerModal.style.display = "block";
  };

  loginBtn.onclick = function () {
    loginModal.style.display = "block";
  };

  registerSpan.onclick = function () {
    registerModal.style.display = "none";
  };

  loginSpan.onclick = function () {
    loginModal.style.display = "none";
  };
});

window.onclick = function (event) {
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  }
};

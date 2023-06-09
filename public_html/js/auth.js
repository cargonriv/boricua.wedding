import { auth } from "../../firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "../../node_modules/firebase/auth";

document.addEventListener("DOMContentLoaded", function () {
  var registerForm = document.getElementById("register-form");
  var loginForm = document.getElementById("login-form");

  registerForm.addEventListener("submit", registerUser);
  loginForm.addEventListener("submit", loginUser);

  function registerUser(e) {
    e.preventDefault();

    // Get user data from form
    var firstName = document.getElementById("firstname").value;
    var lastName = document.getElementById("lastname").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Create new user
    createUserWithEmailAndPassword(auth, email, password)
      .then(function (userCredential) {
        let user = userCredential.user;
        generatePersonalizedInvite(user.uid, firstName, lastName);
        console.log("User registered successfully");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }

  function loginUser(e) {
    e.preventDefault();

    // Get user data from form
    var email = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;

    // Log user in
    signInWithEmailAndPassword(auth, email, password)
      .then(function (user) {
        // User logged in successfully, you can optionally use the user object for anything you like
        console.log("User logged in successfully");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  }
});

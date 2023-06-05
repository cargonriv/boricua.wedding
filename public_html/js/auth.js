import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

document.addEventListener("DOMContentLoaded", function () {
  var firebaseConfig = {
    apiKey: "AIzaSyCuWho-jMLd2M4cZtWklvc4ysgW9Cj00vE",
    authDomain: "boricua-wedding.firebaseapp.com",
    databaseURL: "https://boricua-wedding-default-rtdb.firebaseio.com/",
    projectId: "boricua-wedding",
    storageBucket: "boricua-wedding.appspot.com",
    messagingSenderId: "456987082268",
    appId: "1:456987082268:web:813d459249e6e70d63e9d9",
    measurementId: "G-NNGD3YT30W",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Get form elements
  var registerForm = document.getElementById("register-form");
  var loginForm = document.getElementById("login-form");

  // Listen for form submit events
  registerForm.addEventListener("submit", registerUser);
  loginForm.addEventListener("submit", loginUser);

  function registerUser(e) {
    e.preventDefault();

    // Get user data from form
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Create new user
    createUserWithEmailAndPassword(auth, email, password)
      .then(function (user) {
        // User created successfully, you can optionally use the user object for anything you like
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

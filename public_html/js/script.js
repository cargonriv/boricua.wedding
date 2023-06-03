require("dotenv").config();
import { initializeApp } from "../../node_modules/firebase/app";
import { getAnalytics } from "../../node_modules/firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase Analytics
const analytics = getAnalytics(initializeApp(firebaseConfig));

// Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function (authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function () {
      // Hide the loader when the widget is rendered.
      document.getElementById("loader").style.display = "none";
    },
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: "popup",
  signInSuccessUrl: "https://www.boricua.wedding",
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: "https://www.boricua.wedding/tos",
  // Privacy policy url.
  privacyPolicyUrl: "https://www.boricua.wedding/privacy-policy",
};

// The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);

function openModal(modalId) {
  $("#" + modalId).show();
}

function closeModal() {
  $(".modal").hide();
  $("#login-form")[0].reset();
  $("#register-form")[0].reset();
}

const images = document.querySelectorAll(".image-wrapper");
let currentIndex = 0;
let timer;

function startSlider() {
  timer = setInterval(() => {
    currentIndex++;
    if (currentIndex > images.length - 1) {
      currentIndex = 0;
    }
    setActiveImage();
  }, 3000);
}

function setActiveImage() {
  images.forEach((image, index) => {
    if (index === currentIndex) {
      image.classList.add("active");
      image.classList.remove("inactive");
      const img = image.querySelector("img");
      const imageWidth = img.naturalWidth;
      const imageHeight = img.naturalHeight;
      const ratio = imageWidth / imageHeight;
      if (ratio > 1) {
        img.classList.add("landscape");
        img.classList.remove("portrait");
      } else {
        img.classList.add("portrait");
        img.classList.remove("landscape");
      }
    } else {
      image.classList.remove("active");
      image.classList.add("inactive");
      image.querySelector("img").style.transform = "translate(-50%, -50%)";
    }
  });
}

function resetTimer() {
  clearInterval(timer);
  startSlider();
}

function init() {
  setActiveImage();
  startSlider();
}

init();

// Gallery Modal

const galleryImages = document.querySelectorAll(".gallery-img");
const modal = document.querySelector(".modal");
const modalImg = document.querySelector(".modal-img");
const modalClose = document.querySelector(".modal-close");

galleryImages.forEach((img) => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    document.body.style.overflow = "hidden";
  });
});

// modalClose.addEventListener("click", () => {
//   modal.style.display = "none";
//   document.body.style.overflow = "auto";
// });

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// RSVP Form Validation

const form = document.querySelector("#rsvp-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const attendingInput = document.querySelector("#attending");
const allergiesInput = document.querySelector("#allergies");
const submitButton = document.querySelector("#submit-button");
const formMessage = document.querySelector("#form-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const nameValue = nameInput.value.trim();
  const emailValue = emailInput.value.trim();
  const attendingValue = attendingInput.checked ? "Yes" : "No";
  const allergiesValue = allergiesInput.value.trim();

  if (
    nameValue === "" ||
    emailValue === "" ||
    attendingValue === "" ||
    allergiesValue === ""
  ) {
    formMessage.textContent = "Please fill out all fields.";
    return;
  }

  formMessage.textContent = "Submitting...";
  submitButton.disabled = true;

  // Make AJAX request to submit the form data
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "submit-rsvp.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
      formMessage.textContent = xhr.responseText;
      submitButton.disabled = false;
    }
  };
  xhr.send(
    `name=${nameValue}&email=${emailValue}&attending=${attendingValue}&allergies=${allergiesValue}`
  );
});

const faqRows = document.querySelectorAll(".faq-row");

faqRows.forEach((row) => {
  const question = row.querySelector(".faq-question");
  const answer = row.querySelector(".faq-answer");

  question.addEventListener("click", () => {
    console.log("hello world");
    answer.classList.toggle("show");
  });
});

function validateForm(email, password) {
  // simple validation
  return email.length > 0 && password.length > 0;
}

$(document).ready(function () {
  // TODO: change to var or leave const?
  const firebaseConfig = {
    apiKey: process.env.firebaseAPI,
    authDomain: process.env.firebaseAuthDomain,
    projectId: process.env.firebaseProjectID,
    storageBucket: process.env.firebaseStorageBucket,
    messagingSenderId: process.env.firebaseMessagingSenderID,
    appId: process.env.firebaseAppID,
    measurementId: process.env.firebaseMeasurementID,
  };
  firebase.initializeApp(firebaseConfig);
  firebase.auth().useDeviceLanguage();

  var googleProvider = new firebase.auth.GoogleAuthProvider();
  var twitterProvider = new firebase.auth.TwitterAuthProvider();
  var githubProvider = new firebase.auth.GithubAuthProvider();

  // Handle registration and login
  function handleAuth(provider) {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        var token = result.credential.accessToken;
        var user = result.user;
        console.log(token, user);
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.error(errorCode, errorMessage, email, credential);
      });
  }

  function handleRegister(email, password) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  function handleLogin(email, password) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  }

  $("#register-google, #login-google").click(function (e) {
    e.preventDefault();
    handleAuth(googleProvider);
  });

  $("#register-twitter, #login-twitter").click(function (e) {
    e.preventDefault();
    handleAuth(twitterProvider);
  });

  $("#register-github, #login-github").click(function (e) {
    e.preventDefault();
    handleAuth(githubProvider);
  });

  $("#register-email").submit(function (e) {
    e.preventDefault();
    var email = $("#register-email-field").val();
    var password = $("#register-password-field").val();
    handleRegister(email, password);
  });

  $("#login-email").submit(function (e) {
    e.preventDefault();
    var email = $("#login-email-field").val();
    var password = $("#login-password-field").val();
    handleLogin(email, password);
  });
});

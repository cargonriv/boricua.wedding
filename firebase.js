const firebase = require("firebase");
require("firebase/auth");
require("dotenv").config();

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

firebase.initializeApp(firebaseConfig);

module.exports = firebase;

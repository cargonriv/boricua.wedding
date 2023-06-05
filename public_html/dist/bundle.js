/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public_html/js/script.js":
/*!**********************************!*\
  !*** ./public_html/js/script.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n$(document).ready(function () {\n  var images = $(\".image-wrapper img\");\n  var currentIndex = 0;\n  function setActiveImage() {\n    images.each(function (index, image) {\n      if (index === currentIndex) {\n        $(image).addClass(\"active\").removeClass(\"inactive\");\n        var img = $(image).find(\"img\");\n        var ratio = img.naturalWidth / img.naturalHeight;\n        if (ratio > 1) {\n          img.addClass(\"landscape\").removeClass(\"portrait\");\n        } else {\n          img.addClass(\"portrait\").removeClass(\"landscape\");\n        }\n      } else {\n        $(image).addClass(\"inactive\").removeClass(\"active\");\n        $(image).find(\"img\").css(\"transform\", \"translate(-50%, -50%)\");\n      }\n    });\n  }\n  function startSlider() {\n    setActiveImage();\n    setTimeout(function () {\n      currentIndex = (currentIndex + 1) % images.length;\n      startSlider();\n    }, 3000);\n  }\n  startSlider();\n\n  // Gallery Modal\n  var modalImg = $(\".modal-img\");\n  var modalClose = $(\".modal-close\");\n  var galleryImages = $(\".gallery-img\");\n  galleryImages.click(function () {\n    modalImg.addClass(\"open\");\n    modalImg.attr(\"src\", $(this).attr(\"src\"));\n  });\n  modalClose.click(function () {\n    modalImg.removeClass(\"open\");\n  });\n\n  // FAQ Accordion\n  var faqRows = $(\".faq-row\");\n  faqRows.each(function () {\n    var question = $(this).find(\".faq-question\");\n    var answer = $(this).find(\".faq-answer\");\n    question.click(function () {\n      answer.toggleClass(\"show\");\n    });\n  });\n  function openModal(modal) {\n    modal.show();\n  }\n  function closeModal(modal) {\n    modal.hide();\n    $(\"#login-form\")[0].reset();\n    $(\"#register-form\")[0].reset();\n  }\n\n  // Login & Register Modal Button Handlers\n  var registerModal = $(\"#register-modal\");\n  var loginModal = $(\"#login-modal\");\n  $(\"#login-btn\").click(function () {\n    openModal(loginModal);\n  });\n  $(\"#register-btn\").click(function () {\n    openModal(registerModal);\n  });\n  $(\".close\").click(function () {\n    closeModal(registerModal);\n    closeModal(loginModal);\n  });\n  $(window).click(function (e) {\n    if (e.target === loginModal.get(0)) {\n      closeModal(loginModal);\n    } else if (e.target === registerModal.get(0)) {\n      closeModal(registerModal);\n    }\n  });\n\n  // Login & Register Form Handlers\n  $(\"#login-form\").submit(function (e) {\n    e.preventDefault();\n    var email = $(\"#login-email\").val();\n    var password = $(\"#login-password\").val();\n    handleLogin(email, password);\n  });\n  $(\"#register-form\").submit(function (e) {\n    e.preventDefault();\n    var email = $(\"#email\").val();\n    var password = $(\"#password\").val();\n    var firstname = $(\"#firstname\").val();\n    var lastname = $(\"#lastname\").val();\n    handleRegister(email, password, firstname, lastname);\n  });\n  var firebaseConfig = {\n    apiKey: \"AIzaSyCuWho-jMLd2M4cZtWklvc4ysgW9Cj00vE\",\n    authDomain: \"boricua-wedding.firebaseapp.com\",\n    projectId: \"boricua-wedding\",\n    storageBucket: \"boricua-wedding.appspot.com\",\n    messagingSenderId: \"456987082268\",\n    appId: \"1:456987082268:web:813d459249e6e70d63e9d9\",\n    measurementId: \"G-NNGD3YT30W\"\n  };\n  firebase.initializeApp(firebaseConfig);\n  firebase.auth().useDeviceLanguage();\n  var googleProvider = new firebase.auth.GoogleAuthProvider();\n  var twitterProvider = new firebase.auth.TwitterAuthProvider();\n  var githubProvider = new firebase.auth.GithubAuthProvider();\n  function handleRegister(email, password) {\n    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result) {\n      console.log(\"Registration successful\");\n      closeModal(registerModal);\n      $(\"#register-message\").html(\"Registration successful! You can now log in.\");\n    })[\"catch\"](function (error) {\n      var errorCode = error.code;\n      var errorMessage = error.message;\n      console.error(errorCode, errorMessage);\n      $(\"#register-message\").html(errorMessage);\n    });\n  }\n  function handleLogin(email, password) {\n    firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {\n      console.log(\"Login successful\");\n      closeModal();\n      $(\"#login-message\").html(\"Login successful!\");\n    })[\"catch\"](function (error) {\n      var errorCode = error.code;\n      var errorMessage = error.message;\n      console.error(errorCode, errorMessage);\n      $(\"#login-message\").html(errorMessage);\n    });\n  }\n  function handleAuth(provider) {\n    firebase.auth().signInWithPopup(provider).then(function (result) {\n      var token = result.credential.accessToken;\n      var user = result.user;\n      console.log(token, user);\n      // TODO: Store the token, redirect the user, or take some other action\n    })[\"catch\"](function (error) {\n      console.error(error.code, error.message, error.email, error.credential);\n      // TODO: Display a user-friendly error message\n    });\n  }\n\n  // Social Login Button Handlers\n  $(\"#register-google, #login-google\").click(function (e) {\n    e.preventDefault();\n    handleAuth(googleProvider);\n  });\n  $(\"#register-twitter, #login-twitter\").click(function (e) {\n    e.preventDefault();\n    handleAuth(twitterProvider);\n  });\n  $(\"#register-github, #login-github\").click(function (e) {\n    e.preventDefault();\n    handleAuth(githubProvider);\n  });\n});\n\n//# sourceURL=webpack:///./public_html/js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./public_html/js/script.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;
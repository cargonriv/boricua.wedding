$(document).ready(function () {
  // Wait for Firebase SDK to load before using it
  window.addEventListener("DOMContentLoaded", function () {
    // Firebase SDK is now available for use
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
    const images = $(".image-wrapper img");
    let currentIndex = 0;

    function setActiveImage() {
      images.each((index, image) => {
        if (index === currentIndex) {
          $(image).addClass("active").removeClass("inactive");
          const img = $(image).find("img");
          const ratio = img.naturalWidth / img.naturalHeight;
          if (ratio > 1) {
            img.addClass("landscape").removeClass("portrait");
          } else {
            img.addClass("portrait").removeClass("landscape");
          }
        } else {
          $(image).addClass("inactive").removeClass("active");
          $(image).find("img").css("transform", "translate(-50%, -50%)");
        }
      });
    }

    function startSlider() {
      setActiveImage();
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        startSlider();
      }, 3000);
    }

    startSlider();

    // Gallery Modal
    const modalImg = $(".modal-img");
    const modalClose = $(".modal-close");
    const galleryImages = $(".gallery-img");

    galleryImages.click(function () {
      modalImg.addClass("open");
      modalImg.attr("src", $(this).attr("src"));
    });

    modalClose.click(function () {
      modalImg.removeClass("open");
    });

    // FAQ Accordion
    const faqRows = $(".faq-row");

    faqRows.each(function () {
      const question = $(this).find(".faq-question");
      const answer = $(this).find(".faq-answer");

      question.click(function () {
        answer.toggleClass("show");
      });
    });

    function openModal(modal) {
      modal.show();
    }

    function closeModal(modal) {
      modal.hide();
      $("#login-form")[0].reset();
      $("#register-form")[0].reset();
    }

    // Login & Register Modal Button Handlers
    const registerModal = $("#register-modal");
    const loginModal = $("#login-modal");
    $("#login-btn").click(function () {
      openModal(loginModal);
    });

    $("#register-btn").click(function () {
      openModal(registerModal);
    });

    $(".close").click(function () {
      closeModal(registerModal);
      closeModal(loginModal);
    });

    $(window).click(function (e) {
      if (e.target === loginModal.get(0)) {
        closeModal(loginModal);
      } else if (e.target === registerModal.get(0)) {
        closeModal(registerModal);
      }
    });

    // Login & Register Form Handlers
    $("#login-form").submit(function (e) {
      e.preventDefault();
      const email = $("#login-email").val();
      const password = $("#login-password").val();
      handleLogin(email, password);
    });

    $("#register-form").submit(function (e) {
      e.preventDefault();
      const email = $("#email").val();
      const password = $("#password").val();
      const firstname = $("#firstname").val();
      const lastname = $("#lastname").val();
      handleRegister(email, password, firstname, lastname);
    });

    const firebaseConfig = {
      apiKey: "AIzaSyCuWho-jMLd2M4cZtWklvc4ysgW9Cj00vE",
      authDomain: "boricua-wedding.firebaseapp.com",
      projectId: "boricua-wedding",
      storageBucket: "boricua-wedding.appspot.com",
      messagingSenderId: "456987082268",
      appId: "1:456987082268:web:813d459249e6e70d63e9d9",
      measurementId: "G-NNGD3YT30W",
    };

    firebase.initializeApp(firebaseConfig);
    firebase.auth().useDeviceLanguage();

    const googleProvider = new firebase.auth.GoogleAuthProvider();
    const twitterProvider = new firebase.auth.TwitterAuthProvider();
    const githubProvider = new firebase.auth.GithubAuthProvider();

    function handleRegister(email, password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(function (result) {
          console.log("Registration successful");
          closeModal(registerModal);
          $("#register-message").html(
            "Registration successful! You can now log in."
          );
        })
        .catch(function (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          $("#register-message").html(errorMessage);
        });
    }

    function handleLogin(email, password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(function (result) {
          console.log("Login successful");
          closeModal();
          $("#login-message").html("Login successful!");
        })
        .catch(function (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(errorCode, errorMessage);
          $("#login-message").html(errorMessage);
        });
    }

    function handleAuth(provider) {
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          const token = result.credential.accessToken;
          const user = result.user;
          console.log(token, user);
          // TODO: Store the token, redirect the user, or take some other action
        })
        .catch(function (error) {
          console.error(
            error.code,
            error.message,
            error.email,
            error.credential
          );
          // TODO: Display a user-friendly error message
        });
    }

    // Social Login Button Handlers
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
  });
});

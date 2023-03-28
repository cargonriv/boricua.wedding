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

modalClose.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

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

const faqTabs = document.querySelectorAll('.faq-tab input[type="checkbox"]');

faqTabs.forEach((tab) => {
  tab.addEventListener("change", () => {
    if (tab.checked) {
      faqTabs.forEach((otherTab) => {
        if (otherTab !== tab) {
          otherTab.checked = false;
        }
      });
    }
  });
});

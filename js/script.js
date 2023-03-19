let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? 1 : 0;
    slide.classList.toggle("active", i === index);
  });
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}

function previousSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

function autoChangeSlide() {
  nextSlide();
  setTimeout(autoChangeSlide, 3000);
}

function checkImageOrientation(img) {
  const slide = img.closest(".slide");
  if (img.naturalWidth > img.naturalHeight) {
    console.log("Horizontal!!!");
    img.classList.add("horizontal");
  } else {
    console.log("Vertical!!!");
    slide.classList.add("vertical");
    img.classList.add("vertical");
  }
}

function initImageSlider() {
  const images = document.querySelectorAll(".slide img");
  images.forEach((img) => {
    img.onload = () => {
      checkImageOrientation(img);
    };
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initImageSlider();
  showSlide(slideIndex);
  setTimeout(autoChangeSlide, 3000);
});

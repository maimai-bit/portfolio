document.querySelectorAll(".carousel").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const currentLabel = carousel.querySelector(".current-slide");
  const totalLabel = carousel.querySelector(".total-slides");
  const previousButton = carousel.querySelector(".carousel-arrow--previous");
  const nextButton = carousel.querySelector(".carousel-arrow--next");

  if (!slides.length || !previousButton || !nextButton) return;

  let currentIndex = 0;
  let touchStartX = 0;

  carousel.tabIndex = 0;
  totalLabel.textContent = String(slides.length).padStart(2, "0");

  const showSlide = (newIndex) => {
    currentIndex = (newIndex + slides.length) % slides.length;

    slides.forEach((slide, index) => {
      const isActive = index === currentIndex;
      slide.hidden = !isActive;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
    });

    currentLabel.textContent = String(currentIndex + 1).padStart(2, "0");
  };

  previousButton.addEventListener("click", () => showSlide(currentIndex - 1));
  nextButton.addEventListener("click", () => showSlide(currentIndex + 1));

  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(currentIndex - 1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(currentIndex + 1);
    }
  });

  carousel.addEventListener(
    "touchstart",
    (event) => {
      touchStartX = event.changedTouches[0].clientX;
    },
    { passive: true }
  );

  carousel.addEventListener(
    "touchend",
    (event) => {
      const distance = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(distance) < 45) return;
      showSlide(distance > 0 ? currentIndex - 1 : currentIndex + 1);
    },
    { passive: true }
  );

  showSlide(0);
});

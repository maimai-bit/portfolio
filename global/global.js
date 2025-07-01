function confirmEmailRedirect(e) {
    e.preventDefault(); 
    const confirmed = confirm("You are being redirected to your email. Proceed?");
    if (confirmed) {
      
      window.location.href = "mailto:maikellyjordan@gmail.com?subject=Contact&body=Hi%20Maikelly%2C";
    }
  }

  // carrossel //

  const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
let currentSlide = 0;

function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel();
});

prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateCarousel();
});

window.addEventListener('resize', updateCarousel);
updateCarousel(); // Initial position

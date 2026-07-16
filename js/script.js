const track = document.querySelector('.carousel-track');
const slides = Array.from(document.querySelectorAll('.carousel-slide'));
const prevBtn = document.querySelector('.arrow-btn.prev');
const nextBtn = document.querySelector('.arrow-btn.next');
const parallaxBg = document.querySelector('.parallax-bg');
let currentIndex = 0;

function updateCarousel() {
  if (!track) return;
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function showNext() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}

function showPrev() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
}

if (prevBtn && nextBtn && slides.length) {
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);
}

function updateParallax() {
  if (!parallaxBg) return;
  const offset = -window.scrollY * 0.4;
  parallaxBg.style.transform = `translate3d(0, ${offset}px, 0)`;
}

window.addEventListener('scroll', updateParallax, { passive: true });
updateParallax();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));

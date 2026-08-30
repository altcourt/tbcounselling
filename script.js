const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".main-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

const header = document.querySelector(".site-header");
window.addEventListener(
  "scroll",
  () => {
    header.style.boxShadow =
      window.scrollY > 20 ? "0 8px 30px rgba(30,40,38,.08)" : "none";
  },
  { passive: true },
);

const testimonialSlides = document.querySelectorAll(".testimonial-slide");

const testimonialDots = document.querySelectorAll(".dot");

const previousButton = document.querySelector(".testimonial-arrow.prev");

const nextButton = document.querySelector(".testimonial-arrow.next");

const testimonialSlider = document.querySelector(".testimonial-slider");

let currentTestimonial = 0;
let testimonialTimer;

function showTestimonial(index) {
  if (!testimonialSlides.length) return;

  // Keep the index within the available range
  if (index < 0) {
    index = testimonialSlides.length - 1;
  }

  if (index >= testimonialSlides.length) {
    index = 0;
  }

  currentTestimonial = index;

  // Change slides
  testimonialSlides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentTestimonial);
  });

  // Update dots
  testimonialDots.forEach((dot, i) => {
    const active = i === currentTestimonial;

    dot.classList.toggle("active", active);
    dot.setAttribute("aria-selected", String(active));
  });
}

function nextTestimonial() {
  showTestimonial(currentTestimonial + 1);
}

function previousTestimonial() {
  showTestimonial(currentTestimonial - 1);
}

// Previous button
previousButton.addEventListener("click", () => {
  previousTestimonial();
  restartTestimonialTimer();
});

// Next button
nextButton.addEventListener("click", () => {
  nextTestimonial();
  restartTestimonialTimer();
});

// Dots
testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    showTestimonial(index);
    restartTestimonialTimer();
  });
});

// Automatic rotation
function startTestimonialTimer() {
  testimonialTimer = setInterval(() => {
    nextTestimonial();
  }, 6000);
}

function stopTestimonialTimer() {
  clearInterval(testimonialTimer);
}

function restartTestimonialTimer() {
  stopTestimonialTimer();
  startTestimonialTimer();
}

// Pause when mouse is over testimonials
testimonialSlider.addEventListener("mouseenter", stopTestimonialTimer);

testimonialSlider.addEventListener("mouseleave", startTestimonialTimer);

// Start carousel
showTestimonial(0);
startTestimonialTimer();

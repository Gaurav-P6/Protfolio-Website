/* ================================
   Loading Animation
================================ */

const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  setTimeout(() => {
    loader.classList.add("hidden");
  }, 700);
});

/* ================================
   Mobile Navigation
================================ */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const navItems = document.querySelectorAll(".nav-link");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

/* ================================
   Sticky Header State
================================ */

const header = document.getElementById("header");

function updateHeader() {
  if (window.scrollY > 40) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeader);
updateHeader();

/* ================================
   Active Navigation Highlight
================================ */

const sections = document.querySelectorAll(".section");

function updateActiveNav() {
  let currentSection = "hero";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNav);
updateActiveNav();

/* ================================
   Scroll Reveal Animation
   Uses IntersectionObserver for performance.
================================ */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -60px 0px",
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* ================================
   3D Tilt Cards
   Applies rotateX / rotateY based on mouse position.
================================ */

const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale3d(1.025, 1.025, 1.025)
    `;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = `
      perspective(1000px)
      rotateX(0deg)
      rotateY(0deg)
      scale3d(1, 1, 1)
    `;
  });
});

/* ================================
   Hero Parallax Mouse Movement
================================ */

const hero = document.querySelector(".hero");
const floatingShapes = document.querySelectorAll(".floating-shape");

hero.addEventListener("mousemove", (event) => {
  const rect = hero.getBoundingClientRect();

  const x = (event.clientX - rect.left) / rect.width - 0.5;
  const y = (event.clientY - rect.top) / rect.height - 0.5;

  floatingShapes.forEach((shape, index) => {
    const depth = (index + 1) * 18;

    shape.style.transform = `
      translate3d(${x * depth}px, ${y * depth}px, 0)
      rotate(${x * depth}deg)
    `;
  });
});

hero.addEventListener("mouseleave", () => {
  floatingShapes.forEach((shape) => {
    shape.style.transform = "";
  });
});

/* ================================
   Animated Particles
   Lightweight DOM particles, no external library.
================================ */

const particlesContainer = document.getElementById("particles");
const particleCount = 34;

function createParticles() {
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("span");

    particle.classList.add("particle");

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100 + 40}%`;
    particle.style.animationDuration = `${8 + Math.random() * 10}s`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.opacity = `${0.25 + Math.random() * 0.55}`;

    const size = 2 + Math.random() * 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    particlesContainer.appendChild(particle);
  }
}

createParticles();

/* ================================
   Custom Cursor
================================ */

const cursorDot = document.getElementById("cursorDot");
const cursorOutline = document.getElementById("cursorOutline");

let cursorX = 0;
let cursorY = 0;
let outlineX = 0;
let outlineY = 0;

window.addEventListener("mousemove", (event) => {
  cursorX = event.clientX;
  cursorY = event.clientY;

  cursorDot.style.left = `${cursorX}px`;
  cursorDot.style.top = `${cursorY}px`;
});

function animateCursorOutline() {
  outlineX += (cursorX - outlineX) * 0.16;
  outlineY += (cursorY - outlineY) * 0.16;

  cursorOutline.style.left = `${outlineX}px`;
  cursorOutline.style.top = `${outlineY}px`;

  requestAnimationFrame(animateCursorOutline);
}

animateCursorOutline();

const hoverTargets = document.querySelectorAll("a, button, .tilt-card, input, textarea");

hoverTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    cursorOutline.classList.add("cursor-hover");
  });

  target.addEventListener("mouseleave", () => {
    cursorOutline.classList.remove("cursor-hover");
  });
});

/* ================================
   Magnetic Button Hover
   Slight movement toward the cursor.
================================ */

const magneticButtons = document.querySelectorAll(".magnetic");

magneticButtons.forEach((button) => {
  button.addEventListener("mousemove", (event) => {
    const rect = button.getBoundingClientRect();

    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    button.style.transform = `translate(${x * 0.15}px, ${y * 0.2}px)`;
  });

  button.addEventListener("mouseleave", () => {
    button.style.transform = "";
  });
});

/* ================================
   Back To Top Button
================================ */

const backToTop = document.getElementById("backToTop");

function updateBackToTop() {
  if (window.scrollY > 600) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
}

window.addEventListener("scroll", updateBackToTop);
updateBackToTop();

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* ================================
   Contact Form UI Feedback
   This demo does not send data to a server.
================================ */

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formStatus.textContent = "Sending message...";

  setTimeout(() => {
    formStatus.textContent = "Message sent successfully!";
    contactForm.reset();
  }, 900);
});

/* ================================
   Performance Safety
   Disable heavy cursor visuals on touch devices.
================================ */

const isTouchDevice =
  "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (isTouchDevice) {
  cursorDot.style.display = "none";
  cursorOutline.style.display = "none";
}

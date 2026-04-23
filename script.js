const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");
const revealItems = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

navToggle?.addEventListener("click", () => {
  const isOpen = header.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    header.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  });
});

const formatNumber = (value) => new Intl.NumberFormat("en-IN").format(value);

const animateCounter = (counter) => {
  if (counter.dataset.animated) return;

  const target = Number(counter.dataset.count);
  const duration = 1200;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = `${formatNumber(Math.floor(target * eased))}+`;

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      counter.textContent = `${formatNumber(target)}+`;
      counter.dataset.animated = "true";
    }
  };

  requestAnimationFrame(tick);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add("visible");
      entry.target.querySelectorAll?.("[data-count]").forEach(animateCounter);

      if (entry.target.matches("[data-count]")) {
        animateCounter(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  },
);

revealItems.forEach((item) => observer.observe(item));
counters.forEach((counter) => observer.observe(counter));

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  contactForm.reset();

  if (formNote) {
    formNote.textContent = "Thank you. Your message is ready to be connected to your preferred backend or email service.";
  }
});

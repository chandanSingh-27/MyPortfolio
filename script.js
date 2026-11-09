const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const navigationLinks = document.querySelectorAll(".nav-link");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("open", !isOpen);
  });

  navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    });
  });
}

const sections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", isCurrent);
        if (isCurrent) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));
}

const yearElement = document.querySelector("#year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

const contactForm = document.querySelector("#contact-form");
if (contactForm) {
  const fields = {
    name: document.querySelector("#name"),
    email: document.querySelector("#email"),
    message: document.querySelector("#message")
  };
  const errors = {
    name: document.querySelector("#name-error"),
    email: document.querySelector("#email-error"),
    message: document.querySelector("#message-error")
  };
  const status = document.querySelector("#form-status");

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;

    Object.values(errors).forEach((element) => { element.textContent = ""; });
    Object.values(fields).forEach((field) => field.removeAttribute("aria-invalid"));

    if (fields.name.value.trim().length < 2) {
      errors.name.textContent = "Please enter a name with at least 2 characters.";
      fields.name.setAttribute("aria-invalid", "true");
      valid = false;
    }
    if (!fields.email.validity.valid || !fields.email.value.trim()) {
      errors.email.textContent = "Please enter a valid email address.";
      fields.email.setAttribute("aria-invalid", "true");
      valid = false;
    }
    if (fields.message.value.trim().length < 10) {
      errors.message.textContent = "Please enter a message with at least 10 characters.";
      fields.message.setAttribute("aria-invalid", "true");
      valid = false;
    }

    if (!valid) {
      status.textContent = "Please correct the highlighted fields and try again.";
      const firstInvalid = contactForm.querySelector('[aria-invalid="true"]');
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    const subject = encodeURIComponent(`Portfolio contact from ${fields.name.value.trim()}`);
    const body = encodeURIComponent(
      `Name: ${fields.name.value.trim()}\nEmail: ${fields.email.value.trim()}\n\n${fields.message.value.trim()}`
    );
    status.textContent = "Opening your email application with the message details.";
    window.location.href = `mailto:aravkr2007@gmail.com?subject=${subject}&body=${body}`;
  });
}


/* =========================
   LIGHT / DARK THEME
========================= */

const themeToggle = document.getElementById("theme-toggle");

// Get saved theme or use dark theme by default
const savedTheme = localStorage.getItem("theme") || "dark";

// Apply theme when page loads
document.documentElement.setAttribute("data-theme", savedTheme);

// Update button icon
function updateThemeButton(theme) {
  if (theme === "dark") {
    themeToggle.textContent = "☀️";
    themeToggle.setAttribute("aria-label", "Switch to light theme");
  } else {
    themeToggle.textContent = "🌙";
    themeToggle.setAttribute("aria-label", "Switch to dark theme");
  }
}

// Set initial button icon
updateThemeButton(savedTheme);

// Switch theme on button click
themeToggle.addEventListener("click", () => {
  const currentTheme =
    document.documentElement.getAttribute("data-theme");

  const newTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);

  localStorage.setItem("theme", newTheme);

  updateThemeButton(newTheme);
});

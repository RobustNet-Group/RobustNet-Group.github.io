const loadPartials = () => {
  const includeNodes = document.querySelectorAll("[data-include]");
  const loaders = Array.from(includeNodes).map((node) => {
    const src = node.getAttribute("data-include");
    if (!src) return Promise.resolve();
    return fetch(src)
      .then((res) => (res.ok ? res.text() : Promise.reject(res.statusText)))
      .then((html) => {
        node.innerHTML = html;
      })
      .catch((err) => {
        console.error(`Failed to load ${src}:`, err);
      });
  });
  return Promise.all(loaders);
};

const initNav = () => {
  const navToggle = document.querySelector(".nav__toggle");
  const navLinks = document.querySelector(".nav__links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("is-open");
    });
  }
};

const updateYear = () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
};

const initBackToTop = () => {
  const btn = document.querySelector(".back-to-top");
  if (!btn) return;
  const toggleVisibility = () => {
    if (window.scrollY > 400) {
      btn.classList.add("is-visible");
    } else {
      btn.classList.remove("is-visible");
    }
  };
  window.addEventListener("scroll", toggleVisibility);
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  toggleVisibility();
};

const applyRelativeLinks = () => {
  const root = document.body?.dataset?.root ?? "./";
  document.querySelectorAll("[data-relative]").forEach((link) => {
    const target = link.getAttribute("data-relative");
    if (!target) return;
    link.setAttribute("href", `${root}${target}`);
  });
};

loadPartials().then(() => {
  initNav();
  updateYear();
  initBackToTop();
  applyRelativeLinks();
});

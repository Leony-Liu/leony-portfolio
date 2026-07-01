const navToggle = document.querySelector(".nav-toggle");
const topnav = document.querySelector(".topnav");
const anchorLinks = document.querySelectorAll('a[href^="#"]');
const navLinks = document.querySelectorAll(".topnav a[href^='#'], .rail-dot[href^='#'], .detail-toc a[href^='#']");

if (navToggle && topnav) {
  navToggle.addEventListener("click", () => {
    const isOpen = topnav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  topnav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      topnav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

anchorLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    history.pushState(null, "", targetId);
  });
});

const observedSections = Array.from(navLinks)
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && observedSections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      const id = `#${visible.target.id}`;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === id);
      });
    },
    { rootMargin: "-32% 0px -52% 0px", threshold: [0.1, 0.35, 0.6] }
  );

  [...new Set(observedSections)].forEach((section) => observer.observe(section));
}

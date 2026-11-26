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

const navTargets = new Set(Array.from(navLinks, (link) => link.hash));
const navSections = Array.from(document.querySelectorAll("section[id]"))
  .filter((section) => navTargets.has(`#${section.id}`));

if (navSections.length) {
  let activeId;

  function updateActiveSection() {
    const scroller = document.scrollingElement;
    const atBottom = scroller.scrollTop > 0 &&
      scroller.scrollHeight - scroller.clientHeight - scroller.scrollTop <= 1;
    const currentSection = atBottom ? navSections.at(-1) : navSections.findLast((section) => {
      const scrollMargin = parseFloat(getComputedStyle(section).scrollMarginTop);
      return section.getBoundingClientRect().top <= scrollMargin + 1;
    }) || navSections[0];
    const id = `#${currentSection.id}`;

    if (id === activeId) return;
    activeId = id;
    navLinks.forEach((link) => {
      const isActive = link.hash === id;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  window.addEventListener("scroll", updateActiveSection, { passive: true });
  window.addEventListener("resize", updateActiveSection);
  window.addEventListener("pageshow", updateActiveSection);
  updateActiveSection();
}

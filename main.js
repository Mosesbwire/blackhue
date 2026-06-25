const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".menu-toggle");
const primaryNav = document.querySelector(".primary-nav");
const revealItems = document.querySelectorAll(".reveal-on-scroll");

function setHeaderState() {
  siteHeader?.classList.toggle("is-scrolled", window.scrollY > 12);
}

menuToggle?.addEventListener("click", () => {
  const isOpen = primaryNav?.classList.toggle("is-open");

  menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

primaryNav?.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLAnchorElement)) {
    return;
  }

  primaryNav.classList.remove("is-open");
  menuToggle?.setAttribute("aria-expanded", "false");
});

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

if (revealItems.length > 0) {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.2,
      }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  }
}


const mainImage = document.getElementById("mainProductImage");
const thumbs = document.querySelectorAll(".thumb");

thumbs.forEach(thumb => {

    thumb.addEventListener("click", () => {

        thumbs.forEach(t => t.classList.remove("active"));

        thumb.classList.add("active");

        mainImage.style.opacity = 0;

        setTimeout(() => {
            mainImage.src = thumb.dataset.image;
            mainImage.style.opacity = 1;
        }, 150);

    });

});


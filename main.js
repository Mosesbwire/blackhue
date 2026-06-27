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


  const heroBackground = document.querySelector(".hero-background");
  const blandImg = document.getElementById("heroBlandImage");

  function loadAmbienceImage() {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    const picture = document.createElement("picture");
    picture.className = "hero-bg hero-bg-ambience";

    const source = document.createElement("source");
    source.media = "(min-width: 768px)";
    source.srcset = "assets/LUMEN-BACKGROUND-AMBIENCE.jpg";

    const img = document.createElement("img");
    img.src = isDesktop
      ? "assets/LUMEN-BACKGROUND-AMBIENCE.jpg"
      : "assets/LUMEN-BACKGROUND-AMBIENCE-MOBILE.jpg";
    img.alt = "";
    img.decoding = "async";

    picture.appendChild(source);
    picture.appendChild(img);
    heroBackground.appendChild(picture);

    img.onload = () => {
      requestAnimationFrame(() => {
        picture.classList.add("is-visible");
      });
    };
  }

  if (blandImg.complete) {
    loadAmbienceImage();
  } else {
    blandImg.addEventListener("load", loadAmbienceImage, { once: true });
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


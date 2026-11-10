// Clip-path reveals (data-clip), header line after scroll, bottom call bar after the first screen.
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const clips = document.querySelectorAll<HTMLElement>("[data-clip]");
if (reduce || !("IntersectionObserver" in window)) {
  clips.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.1 });
  clips.forEach((el) => io.observe(el));
}
const header = document.querySelector<HTMLElement>(".site-header");
const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 8);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });
const bar = document.querySelector<HTMLElement>(".callbar");
const hero = document.getElementById("hero");
if (bar && hero && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => bar.classList.toggle("is-on", !e.isIntersecting), { threshold: 0, rootMargin: "-40% 0px 0px 0px" }).observe(hero);
}
// close mobile menu on anchor click
document.querySelectorAll<HTMLAnchorElement>(".menu a").forEach((a) => a.addEventListener("click", () => a.closest("details")?.removeAttribute("open")));

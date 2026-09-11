/* ==========================================================================
   animations.js
   Adds scroll-triggered reveal animations to elements marked with
   [data-reveal] / [data-reveal-group]. Purely additive — doesn't touch
   layout, fonts, sizes, or any existing logic in script.js.
   ========================================================================== */
(function () {
  "use strict";

  var prefersReduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Give taps and clicks a small, screen-level ripple without changing layout.
  if (!prefersReduced && "PointerEvent" in window) {
    document.addEventListener("pointerdown", function (event) {
      if (event.button !== undefined && event.button !== 0) return;

      var ripple = document.createElement("span");
      ripple.className = "touch-ripple";
      ripple.setAttribute("aria-hidden", "true");
      ripple.style.setProperty("--touch-x", event.clientX + "px");
      ripple.style.setProperty("--touch-y", event.clientY + "px");
      document.body.appendChild(ripple);

      ripple.addEventListener("animationend", function () {
        ripple.remove();
      }, { once: true });
    }, { passive: true });
  }

  var targets = document.querySelectorAll("[data-reveal], [data-reveal-group]");

  if (!targets.length) return;

  if (prefersReduced || !("IntersectionObserver" in window)) {
    // Show everything immediately, no animation.
    targets.forEach(function (el) { el.classList.add("in-view"); });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
  );

  targets.forEach(function (el) { observer.observe(el); });

  // Little envelope hint: peek the note once on first load so it's
  // noticed, then let normal hover/focus behaviour take over.
  var note = document.getElementById("envelopeNote");
  if (note) {
    setTimeout(function () {
      note.classList.add("show");
      setTimeout(function () { note.classList.remove("show"); }, 1600);
    }, 1400);
})();

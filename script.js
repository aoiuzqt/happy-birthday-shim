(function () {
  "use strict";

  /* ---------- Song intro / gate ---------- */
  const gate = document.getElementById('gate');
  const songButtons = document.querySelectorAll('.song');
  const enterBtn = document.getElementById('enterBtn');
  const gateHint = document.getElementById('gateHint');
  let selectedSong = '1';

  songButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      songButtons.forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      selectedSong = btn.dataset.song;
      gateHint.textContent = 'Song ' + (selectedSong === '1' ? '01' : '02') + ' selected';
    });
  });

  enterBtn.addEventListener('click', () => {
    gate.classList.add('gate-hidden');
    document.body.classList.remove('gate-open');
    window.scrollTo(0, 0);
  });

  /* ---------- Music toggle in nav + press-play section ---------- */
  const musicToggle = document.getElementById('musicToggle');
  const musicLabel = document.getElementById('musicLabel');
  const sectionPlay = document.getElementById('sectionPlay');
  let playing = false;

  function setPlaying(next) {
    playing = next;
    musicToggle.setAttribute('aria-pressed', String(playing));
    musicLabel.textContent = playing ? 'Playing' : 'Music';
    sectionPlay.setAttribute('aria-pressed', String(playing));
    sectionPlay.setAttribute('aria-label', playing ? 'Pause song' : 'Play song');
    // Hook your own <audio> element here if you add a real track:
    // playing ? audioEl.play() : audioEl.pause();
  }

  musicToggle.addEventListener('click', () => setPlaying(!playing));
  sectionPlay.addEventListener('click', () => setPlaying(!playing));

  /* ---------- Photo upload slots ---------- */
  document.querySelectorAll('.photo-slot input[type="file"]').forEach((input) => {
    input.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      const slot = input.closest('.photo-slot');
      const reader = new FileReader();
      reader.onload = (ev) => {
        let img = slot.querySelector('img');
        if (!img) {
          img = document.createElement('img');
          img.alt = '';
          slot.prepend(img);
        }
        img.src = ev.target.result;
        slot.classList.add('has-image');
      };
      reader.readAsDataURL(file);
    });
  });

  /* ---------- Envelope reveal ---------- */
  const envelopeLink = document.querySelector('.envelope-link');
  const envelope = document.querySelector('.envelope');
  const envelopeNote = document.querySelector('.envelope-note');

  if (envelopeLink && envelope && envelopeNote) {
    envelopeLink.addEventListener('click', () => {
      envelope.classList.add('opened');
      envelopeNote.classList.add('show');
    });
  }

  /* ---------- Flower form (front-end only) ---------- */
  const flowerForm = document.getElementById('flowerForm');
  const flowerStatus = document.getElementById('flowerStatus');
  flowerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    flowerStatus.textContent = 'Saved — now go actually send yourself flowers. You deserve them. 🌸';
    flowerForm.reset();

  });

})();

/* =========================================================
   DREAMY SCROLL + POP LETTERS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------------------------------------
     Add reveal classes
     ------------------------------------------------------- */

  const revealElements = document.querySelectorAll(
    ".beauty-heading, " +
    ".beauty-side, " +
    ".beauty-caption, " +
    ".smile-copy, " +
    ".observation h2, " +
    ".quote blockquote, " +
    ".little-things h2, " +
    ".card, " +
    ".frames h2, " +
    ".player h2, " +
    ".letter-body, " +
    ".letter-sign, " +
    ".flowers h2, " +
    ".flowers .lede, " +
    ".magic-letter-copy, " +
    "footer p"
  );

  revealElements.forEach(element => {
    element.classList.add("reveal");
  });


  /* -------------------------------------------------------
     Images
     ------------------------------------------------------- */

  const images = document.querySelectorAll(
    ".smile-photo, " +
    ".card-photo, " +
    ".collage .photo-slot, " +
    ".player-frame"
  );

  images.forEach(element => {
    element.classList.add("reveal-photo");
  });


  /* -------------------------------------------------------
     POP LETTERS
     ------------------------------------------------------- */

  const popTexts = document.querySelectorAll(
    ".beauty-heading, " +
    ".observation h2, " +
    ".quote blockquote, " +
    ".little-things h2, " +
    ".frames h2, " +
    ".player h2, " +
    ".magic-letter-copy h2"
  );

  popTexts.forEach(element => {

    /*
      Don't destroy the existing HTML structure.
      Only wrap text nodes in spans.
    */

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT
    );

    const textNodes = [];

    while (walker.nextNode()) {
      textNodes.push(walker.currentNode);
    }

    textNodes.forEach(node => {

      if (!node.nodeValue.trim()) return;

      const fragment = document.createDocumentFragment();

      [...node.nodeValue].forEach(char => {

        const span = document.createElement("span");

        span.className = "letter";

        span.textContent =
          char === " " ? "\u00A0" : char;

        fragment.appendChild(span);
      });

      node.parentNode.replaceChild(
        fragment,
        node
      );
    });

    element.classList.add("pop-text");
  });


  /* -------------------------------------------------------
     SCROLL OBSERVER
     ------------------------------------------------------- */

  const observer = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        /*
          Stop observing once revealed.
          This prevents the animation from replaying
          every time she scrolls up and down.
        */

        observer.unobserve(entry.target);
      });

    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );


  document
    .querySelectorAll(".reveal, .reveal-photo, .pop-text")
    .forEach(element => {
      observer.observe(element);
    });


  /* -------------------------------------------------------
     LETTER DELAY
     ------------------------------------------------------- */

  document
    .querySelectorAll(".pop-text")
    .forEach(element => {

      const letters =
        element.querySelectorAll(".letter");

      letters.forEach((letter, index) => {

        letter.style.transitionDelay =
          `${Math.min(index * 0.025, 0.7)}s`;

      });

    });


  /* -------------------------------------------------------
     DREAMY TOUCH / SCROLL PARTICLES
     ------------------------------------------------------- */

  let lastTouch = 0;

  window.addEventListener(
    "touchstart",
    event => {

      const now = Date.now();

      /*
        Prevent too many particles
        when the user is rapidly scrolling.
      */

      if (now - lastTouch < 180) return;

      lastTouch = now;

      const touch = event.touches[0];

      createDreamParticle(
        touch.clientX,
        touch.clientY
      );

    },
    { passive: true }
  );


  function createDreamParticle(x, y) {

    const particle =
      document.createElement("span");

    particle.className =
      "dream-particle";

    particle.style.left =
      `${x}px`;

    particle.style.top =
      `${y}px`;

    particle.style.setProperty(
      "--drift-x",
      `${(Math.random() - .5) * 50}px`
    );

    document.body.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 2300);
  }

});

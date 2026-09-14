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

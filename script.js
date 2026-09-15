(function () {
  "use strict";

  /* ---------- Site-wide music ---------- */
  const gate = document.getElementById("gate");
const songButtons = document.querySelectorAll(".song");
const enterBtn = document.getElementById("enterBtn");
const gateHint = document.getElementById("gateHint");
const audio = document.getElementById("audio");
const musicToggle = document.getElementById("musicToggle");
const sectionPlay = document.getElementById("sectionPlay");

/* =========================
   SONG FILES
========================= */

const songs = {
  "1": "assets/song1.mp3",
  "2": "assets/song2.mp3"
};

/* =========================
   LOCAL STORAGE
========================= */

const selectedSongKey = "for-her-selected-song";
const playingKey = "for-her-playing";
const positionKey = "for-her-position";

let selectedSong = localStorage.getItem(selectedSongKey);

if (!songs[selectedSong]) {
  selectedSong = "1";
}

let playing = false;


/* =========================
   MUSIC UI
========================= */

function updateMusicUI() {

  [musicToggle, sectionPlay].forEach((button) => {

    if (button) {
      button.setAttribute(
        "aria-pressed",
        playing ? "true" : "false"
      );
    }

  });

}


/* =========================
   LOAD SONG
========================= */

function loadSong(songNumber) {

  const songPath = songs[songNumber];

  if (!audio || !songPath) return;

  if (audio.getAttribute("src") !== songPath) {

    audio.src = songPath;
    audio.load();

  }

}


/* =========================
   PLAY
========================= */

function playMusic() {

  if (!audio) return;

  audio.play()
    .then(() => {

      playing = true;

      localStorage.setItem(
        playingKey,
        "true"
      );

      updateMusicUI();

    })
    .catch((error) => {

      playing = false;

      updateMusicUI();

      console.error(
        "Could not play song:",
        error
      );

    });

}


/* =========================
   PAUSE
========================= */

function pauseMusic() {

  if (!audio) return;

  audio.pause();

  playing = false;

  localStorage.setItem(
    playingKey,
    "false"
  );

  localStorage.setItem(
    positionKey,
    String(audio.currentTime)
  );

  updateMusicUI();

}


/* =========================
   PLAY / PAUSE TOGGLE
========================= */

function setPlaying(state) {

  if (state) {
    playMusic();
  } else {
    pauseMusic();
  }

}


/* =========================
   RESUME AFTER NAVIGATION
========================= */

function resumeAfterNavigation() {

  if (
    localStorage.getItem(playingKey) !== "true"
  ) {
    return;
  }

  const position = Number(
    localStorage.getItem(positionKey)
  );

  if (
    Number.isFinite(position) &&
    position > 0
  ) {

    audio.addEventListener(
      "loadedmetadata",
      () => {

        audio.currentTime = Math.min(
          position,
          Math.max(0, audio.duration - 0.1)
        );

      },
      { once: true }
    );

  }

  playMusic();

}


/* =========================
   AUDIO EVENTS
========================= */

if (audio) {

  loadSong(selectedSong);

  audio.addEventListener(
    "timeupdate",
    () => {

      localStorage.setItem(
        positionKey,
        String(audio.currentTime)
      );

    }
  );


  audio.addEventListener(
    "ended",
    () => {

      playing = false;

      localStorage.setItem(
        playingKey,
        "false"
      );

      localStorage.setItem(
        positionKey,
        "0"
      );

      updateMusicUI();

    }
  );


  audio.addEventListener(
    "error",
    () => {

      console.error(
        "❌ Could not load the audio file:",
        songs[selectedSong]
      );

    }
  );

}


/* =========================
   SONG SELECTION
========================= */

songButtons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      const requestedSong =
        button.dataset.song;

      if (!songs[requestedSong]) {
        return;
      }


      /* Remove selection */
      songButtons.forEach((item) => {

        item.setAttribute(
          "aria-pressed",
          "false"
        );

      });


      /* Select clicked song */
      button.setAttribute(
        "aria-pressed",
        "true"
      );


      selectedSong = requestedSong;


      /* Save selection */
      localStorage.setItem(
        selectedSongKey,
        selectedSong
      );


      /* Update text */
      if (gateHint) {

        gateHint.textContent =
          "Song " +
          (selectedSong === "1"
            ? "01"
            : "02") +
          " selected";

      }


      /* Load selected song */
      loadSong(selectedSong);

    }
  );

});


/* =========================
   ENTER BUTTON
========================= */

if (enterBtn) {

  enterBtn.addEventListener(
    "click",
    () => {

      loadSong(selectedSong);

      if (gate) {
        gate.classList.add(
          "gate-hidden"
        );
      }

      document.body.classList.remove(
        "gate-open"
      );

      window.scrollTo({
        top: 0,
        behavior: "instant"
      });

      playMusic();

    }
  );

} else {

  resumeAfterNavigation();

}


/* =========================
   MUSIC BUTTONS
========================= */

[musicToggle, sectionPlay].forEach(
  (button) => {

    if (button) {

      button.addEventListener(
        "click",
        () => {

          setPlaying(!playing);

        }
      );

    }

  }
);


/* =========================
   INITIAL UI
========================= */

songButtons.forEach((button) => {

  button.setAttribute(
    "aria-pressed",
    button.dataset.song === selectedSong
      ? "true"
      : "false"
  );

});

if (gateHint) {

  gateHint.textContent =
    "Song " +
    (selectedSong === "1"
      ? "01"
      : "02") +
    " selected";

}

updateMusicUI();

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
  if (flowerForm && flowerStatus) {
    flowerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      flowerStatus.textContent = 'Saved — now go actually send yourself flowers. You deserve them. 🌸';
      flowerForm.reset();
    });
  }

})();



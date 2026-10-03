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
/* =========================================================
   PHOTO UPLOAD SYSTEM
   All IDs are prefixed with ny- so they won't conflict
   with JavaScript from your other pages.
   ========================================================= */

(function () {

  const root = document.getElementById("new-year-letter");

  if (!root) return;


  function wireSlot(fileId, imgId) {

    const fileInput = root.querySelector("#" + fileId);
    const img = root.querySelector("#" + imgId);

    if (!fileInput || !img) return;

    const slot = img.closest(".ny-slot");

    if (!slot) return;


    fileInput.addEventListener("change", function (event) {

      const file = event.target.files[0];

      if (!file) return;


      /* Make sure it is actually an image */

      if (!file.type.startsWith("image/")) {
        alert("Please select an image.");
        return;
      }


      const reader = new FileReader();


      reader.onload = function (event) {

        img.src = event.target.result;

        slot.classList.add("has-img");

      };


      reader.readAsDataURL(file);

    });

  }


  /* Connect all five photo slots */

  ["1", "2", "3", "4", "Bg"].forEach(function (number) {

    wireSlot(
      "ny-file" + number,
      "ny-img" + number
    );

  });


  /* Clicking photo area opens file picker */

  root.querySelectorAll(".ny-slot").forEach(function (slot) {

    slot.addEventListener("click", function (event) {

      if (event.target.tagName === "INPUT") return;

      const input = slot.querySelector(
        'input[type="file"]'
      );

      if (input) {
        input.click();
      }

    });

  });

})();
const spreads=[...document.querySelectorAll('.spread')];
const total=spreads.length;
let current=0;
const prevBtn=document.getElementById('prevBtn');
const nextBtn=document.getElementById('nextBtn');
const prevEdge=document.getElementById('prevEdge');
const nextEdge=document.getElementById('nextEdge');
const counter=document.getElementById('counter');
const progressBar=document.getElementById('progressBar');

function layout(){
  spreads.forEach((s,i)=>{
    s.style.zIndex=i<current?total+i:total-i;
    s.classList.toggle('flipped',i<current);
  });
  counter.textContent=String(current+1).padStart(2,'0')+' / '+String(total).padStart(2,'0');
  progressBar.style.width=((current+1)/total*100)+'%';
  prevBtn.disabled=current===0;
  nextBtn.disabled=current===total-1;
}
function goTo(i){if(i<0||i>=total||i===current)return;current=i;layout()}
function next(){if(current<total-1){current++;layout()}}
function prev(){if(current>0){current--;layout()}}
prevBtn.onclick=prev;nextBtn.onclick=next;prevEdge.onclick=prev;nextEdge.onclick=next;
document.addEventListener('keydown',e=>{if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev()});

// Page photo slots: click any slot and choose a local image.
document.querySelectorAll('.photo-slot').forEach(slot=>{
  const input=slot.querySelector('input[type=file]');
  const img=slot.querySelector('img');
  if(!input||!img)return;
  slot.addEventListener('click',e=>{if(e.target===input)return;input.click()});
  input.addEventListener('change',()=>{
    const file=input.files?.[0];
    if(!file)return;
    const reader=new FileReader();
    reader.onload=ev=>{img.src=ev.target.result;slot.classList.add('has-photo')};
    reader.readAsDataURL(file);
  });
});

// Secret note interaction.
const secretButton=document.getElementById('secretButton');
const secretNote=document.getElementById('secretNote');
if(secretButton&&secretNote){
  secretButton.addEventListener('click',()=>{
    secretNote.classList.add('open');
    secretButton.style.opacity='0';
    secretButton.style.pointerEvents='none';
  });
}

// Prevent editable text from accidentally turning a page when clicking inside it.
document.querySelectorAll('[contenteditable="true"]').forEach(el=>el.addEventListener('click',e=>e.stopPropagation()));

layout();




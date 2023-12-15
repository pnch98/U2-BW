// import { token } from "./token.js";

let saluto;
const oraCorrente = new Date().getHours();

if (oraCorrente >= 5 && oraCorrente < 12) {
  saluto = "Buongiornissimo!11!!";
} else if (oraCorrente >= 12 && oraCorrente < 18) {
  saluto = "Buon pomeriggio!";
} else {
  saluto = "Buonasera!";
}
document.getElementById("buonasera").querySelector("h3").innerHTML = saluto;

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": token,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.addEventListener("DOMContentLoaded", () => {
  const albumId = getRandomAlbum();
  sectionPlaylist();

  fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + albumId, options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((album) => {
      showAdd(album);
    });
});

function sectionPlaylist() {
  for (let i = 0; i < 6; i++) {
    const randomAlbumId = getRandomAlbum();

    fetch("https://deezerdevs-deezer.p.rapidapi.com/album/" + randomAlbumId, options)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((album) => {
        const col = document.createElement("col");
        const outDiv = document.createElement("div");
        outDiv.className = "d-flex rounded bg-dark align-items-center";
        outDiv.style.cursor = "pointer";
        outDiv.addEventListener("click", () => {
          openAlbumPage(album.id);
        });

        const inDiv1 = document.createElement("div");
        inDiv1.className = "flex-shrink-0 me-2";
        const img = document.createElement("img");
        img.className = "w-100 rounded-start";
        img.src = album.cover_small;

        const inDiv2 = document.createElement("div");
        inDiv2.className = "d-flex overflow-hidden fs-6 m-0";

        const title = document.createElement("p");
        title.className = "text-nowrap mb-0";
        title.innerText = album.title;

        inDiv2.appendChild(title);
        inDiv1.appendChild(img);
        outDiv.appendChild(inDiv1);
        outDiv.appendChild(inDiv2);
        col.appendChild(outDiv);

        const row = document.getElementById("smCards");
        row.appendChild(col);
      });
  }
}

function getRandomAlbum() {
  const keys = Object.keys(idObj);
  const randIndex = Math.floor(Math.random() * keys.length);
  const values = [...idObj[`${keys[randIndex]}`]];

  const randIndexValue = Math.floor(Math.random() * values.length);
  return values[randIndexValue];
}

function showAdd(album) {
  const songs = album.tracks.data;
  const randIndexSongs = Math.floor(Math.random() * songs.length);

  const selectedSong = songs[randIndexSongs];

  const img = document.getElementById("adImg");
  img.src = selectedSong.album.cover_medium;

  const title = document.getElementById("album").querySelector("h1");
  title.innerHTML = selectedSong.title;
  const authors = document.getElementById("authors");
  authors.innerHTML = selectedSong.artist.name;

  btnPlayAds.addEventListener("click", function () {
    const footerImg = document.getElementById("footerImg").querySelector("img");
    footerImg.src = selectedSong.album.cover_medium;
    const footerSong = document.getElementById("footerSong").querySelectorAll("p");
    footerSong[0].innerHTML = selectedSong.title;
    footerSong[1].innerHTML = selectedSong.artist.name;
    const audioContainer = document.getElementById("audioPlayer");
    audioContainer.src = selectedSong.preview;
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = 0;
    const playPauseBtn = document.getElementById("playPauseBtn");
    const audio = document.getElementById("audioPlayer");
    audio.play();
    playPauseBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
  });
}

function openAlbumPage(id) {
  window.location.assign("./album.html?albumId=" + id);
}

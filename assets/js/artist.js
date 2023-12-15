// import { token } from "./token.js";

const url = "https://deezerdevs-deezer.p.rapidapi.com/artist/";
const artistId = new URLSearchParams(window.location.search).get("artistId");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": token,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.addEventListener("DOMContentLoaded", () => {
  search(artistId);
});

function search(value) {
  fetch(url + value, options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((artist) => {
      console.log(artist);
      const div = document.getElementById("artistBack");
      div.style = `
      background-image: url("${artist.picture_big}");
      background-position: 50% 20%;
      `;

      document.getElementById("currentArtist").innerHTML = `
        <p class="mb-0"><i class="bi bi-patch-check-fill text-primary"></i> Artista verificato</p>
        <h1 class="display-2 fw-bold mb-3">${artist.name}</h1>
        <p>${artist.nb_fan} ascoltatori mensili</p>
        `;

      searchSongs(artistId);
    });
}

const lista = document.getElementById("songList");

function searchSongs(id) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=10`, options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((songs) => {
      showFiveSongs(songs, 5);

      const moreBtn = document.getElementById("showMore");
      moreBtn.addEventListener("click", function () {
        if (moreBtn.innerText == "VISUALIZZA ALTRO") {
          showFiveSongs(songs, 10);
          moreBtn.innerText = "MOSTRA MENO";
        } else {
          for (let i = lista.children.length - 1; i >= 5; i--) {
            lista.children[i].remove();
            moreBtn.innerText = "VISUALIZZA ALTRO";
          }
        }
      });
      showAlbums(songs.data);
    });
}

function showFiveSongs(songs, limit) {
  let i = limit - 5;
  for (i; i < limit; i++) {
    const row = document.createElement("div");
    row.className = "row d-flex mb-3 g-0 song";

    const inDiv1 = document.createElement("div");
    inDiv1.className = "col-1 d-flex justify-content-center align-items-center text-white-50";
    inDiv1.innerHTML = i + 1;
    const inDiv2 = document.createElement("div");
    inDiv2.className = "col";
    /* -------- */
    const divImg = document.createElement("div");
    divImg.className = "d-flex";

    const inDivImg1 = document.createElement("div");
    inDivImg1.className = "me-2 flex-shrink-0";
    const img = document.createElement("img");
    img.className = "w-100";
    img.src = songs.data[i].album["cover_small"];

    const inDivImg2 = document.createElement("div");
    inDivImg2.className = "d-flex fs-6 m-0 flex-grow-1";

    const title = document.createElement("p");
    title.className = "mb-0";
    title.innerText = songs.data[i].title;

    inDivImg2.appendChild(title);
    inDivImg1.appendChild(img);
    divImg.appendChild(inDivImg1);
    divImg.appendChild(inDivImg2);

    inDiv2.appendChild(divImg);
    /* -------- */

    /*------*/

    const inDiv3 = document.createElement("div");
    inDiv3.className = "col-2 d-flex justify-content-center align-items-center text-white-50";
    const p = document.createElement("p");
    p.className = "mb-0";
    const views = Math.round(Math.random() * 700000) + 3000000;
    p.innerHTML = views;
    inDiv3.appendChild(p);

    const inDiv4 = document.createElement("div");
    inDiv4.className = "col-2 d-flex justify-content-center align-items-center text-white-50";
    const duration = document.createElement("p");
    duration.className = "mb-0";
    const resto = songs.data[i].duration % 60 < 10 ? "0" + (songs.data[i].duration % 60) : songs.data[i].duration % 60;
    duration.innerHTML = `${parseInt(songs.data[i].duration / 60)}:${resto}`;
    inDiv4.appendChild(duration);

    const inDiv5 = document.createElement("div");
    inDiv5.className = "threeDot col-1 d-flex justify-content-center align-items-center text-white-50";
    const threeDot = document.createElement("i");

    threeDot.innerHTML = '<i class="bi bi-three-dots-vertical"></i>';
    inDiv5.appendChild(threeDot);

    row.appendChild(inDiv1);
    row.appendChild(inDiv2);
    row.appendChild(inDiv3);
    row.appendChild(inDiv4);
    row.appendChild(inDiv5);

    lista.appendChild(row);
    row.addEventListener("click", function () {
      const footerImg = document.getElementById("footerImg").querySelector("img");
      footerImg.src = songs.data[i].album["cover_small"];
      const footerSong = document.getElementById("footerSong").querySelectorAll("p");
      footerSong[0].innerHTML = songs.data[i].title;
      footerSong[1].innerHTML = songs.data[i].artist.name;
      const audioContainer = document.getElementById("audioPlayer");
      audioContainer.src = songs.data[i].preview;
      const progressBar = document.getElementById("progressBar");
      progressBar.style.width = 0;
      const playPauseBtn = document.getElementById("playPauseBtn");
      const audio = document.getElementById("audioPlayer");
      audio.play();
      playPauseBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
    });
  }
}
const idAlbumArray = [];
/*funzioni cards discografia*/
function showAlbums(songs) {
  console.log(songs);
  songs.forEach((song) => {
    if (!idAlbumArray.includes(song.album.id) && idAlbumArray.length < 5) {
      idAlbumArray.push(song.album.id);
      const albumCard = document.createElement("div");
      albumCard.className = "col";
      albumCard.innerHTML = `<div class="custom-card-bg p-2 rounded-1 text-nowrap overflow-hidden mb-3">
     <img src="${song.album.cover_medium}" alt="cover" class="w-100 rounded-1 mb-4" />
     <h6>${song.album.title}</h6>
   </div>`;
      const albumRow = document.getElementById("discList");
      albumRow.appendChild(albumCard);
      albumCard.addEventListener("click", function () {
        window.location.assign("./album.html?albumId=" + song.album.id);
      });
    }
  });
}

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
  console.log(id);
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
      for (let i = 0; i < 10; i++) {
        const row = document.createElement("div");
        row.className = "row d-flex mb-3 g-0 song";

        const inDiv1 = document.createElement("div");
        inDiv1.className = "col-1 d-flex justify-content-center align-items-center text-white-50";
        inDiv1.innerHTML = i + 1;
        const inDiv2 = document.createElement("div");
        inDiv2.className = "col-5";
        /* -------- */
        const divImg = document.createElement("div");
        divImg.className = "d-flex";

        const inDivImg1 = document.createElement("div");
        inDivImg1.className = "me-2 ";
        const img = document.createElement("img");
        img.className = "w-100";
        img.src = songs.data[i].album["cover_small"];

        const inDivImg2 = document.createElement("div");
        inDivImg2.className = "d-flex fs-6 m-0";

        const title = document.createElement("p");
        title.className = "mb-0";
        title.innerText = songs.data[i].title;

        inDivImg2.appendChild(title);
        inDivImg1.appendChild(img);
        divImg.appendChild(inDivImg1);
        divImg.appendChild(inDivImg2);

        inDiv2.appendChild(divImg);
        /* -------- */

        const inDiv3 = document.createElement("div");
        inDiv3.className = "col-4 d-flex justify-content-center align-items-center text-white-50";
        const p = document.createElement("p");
        p.className = "mb-0";
        const views = Math.round(Math.random() * 700000) + 3000000;
        p.innerHTML = views;
        inDiv3.appendChild(p);

        const inDiv4 = document.createElement("div");
        inDiv4.className = "col-2 d-flex justify-content-center align-items-center text-white-50";
        const duration = document.createElement("p");
        duration.className = "mb-0";
        const resto =
          songs.data[i].duration % 60 < 10 ? "0" + (songs.data[i].duration % 60) : songs.data[i].duration % 60;
        duration.innerHTML = `${parseInt(songs.data[i].duration / 60)}:${resto}`;
        inDiv4.appendChild(duration);

        row.appendChild(inDiv1);
        row.appendChild(inDiv2);
        row.appendChild(inDiv3);
        row.appendChild(inDiv4);

        lista.appendChild(row);
      }
    });
}

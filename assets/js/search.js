// import { token } from "./token.js";

const playlists = document.getElementById("playlists");
const resultPage = document.getElementById("results");

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": token,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

for (let i = 0; i < 36; i++) {
  const col = document.createElement("div");
  col.className = "col";

  const div = document.createElement("div");
  //   const title = document.createElement("h5");
  const img = document.createElement("img");
  img.src = `./assets/imgs/search/image-${i + 1}.jpg`;
  img.className = "w-100 zoom rounded-2";

  div.appendChild(img);
  col.appendChild(div);

  playlists.appendChild(col);
}

window.onload = function () {
  const form = document.getElementById("searchForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    handleSubmit();
  });
};

function handleSubmit() {
  const searchValue = document.getElementById("searchValue").value;
  console.log(searchValue);
  showResults(searchValue);
}

function showResults(searchValue) {
  resultPage.innerHTML = "";

  fetch(url + searchValue, options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((results) => {
      showArtist(results.data[0]);

      showSongs(results.data);

      console.log(results);
    });
}

function showArtist(result) {
  const divAA = document.createElement("div");
  divAA.className = "d-flex flex-wrap align-items-start";

  const container = document.createElement("div");
  container.className = "me-5 mb-5";

  const artist = document.createElement("h5");
  artist.innerText = "Artista:";

  const div = document.createElement("div");
  div.style = "width: 300px; cursor: pointer";
  div.className = "d-flex align-items-center bg-black rounded-2 me-4";

  div.addEventListener("click", function () {
    openArtistPage(result.artist.id);
  });

  const inDiv1 = document.createElement("div");
  inDiv1.className = "rounded-2 me-2";
  inDiv1.style = `
  width: 100px; 
  height: 100px; 
  background-image: url(${result.artist.picture_medium}); 
  background-size: cover; 
  background-repeat: no-repeat;
  `;
  const inDiv2 = document.createElement("div");
  inDiv2.className = "p-2";

  const title = document.createElement("h4");
  title.innerHTML = result.artist.name;

  inDiv2.appendChild(title);

  div.appendChild(inDiv1);
  div.appendChild(inDiv2);

  container.appendChild(artist);
  container.appendChild(div);

  divAA.appendChild(container);

  showAlbum(result, divAA);
}

function showAlbum(result, divAA) {
  const container = document.createElement("div");
  container.className = "mb-5";

  const album = document.createElement("h5");
  album.innerText = "Album:";

  const div = document.createElement("div");
  div.style = "cursor: pointer";
  div.className = "d-flex align-items-center bg-black rounded-2 me-4";

  div.addEventListener("click", function () {
    openAlbumPage(result.album.id);
  });

  const inDiv1 = document.createElement("div");
  inDiv1.className = "rounded-2 me-2";
  inDiv1.style = `
  width: 100px; 
  height: 100px; 
  background-image: url(${result.album.cover_medium}); 
  background-size: cover; 
  background-repeat: no-repeat;
  `;
  const inDiv2 = document.createElement("div");
  inDiv2.className = "p-2";

  const title = document.createElement("h4");
  title.innerHTML = result.album.title;

  inDiv2.appendChild(title);

  div.appendChild(inDiv1);
  div.appendChild(inDiv2);

  container.appendChild(album);
  container.appendChild(div);

  divAA.appendChild(container);

  resultPage.appendChild(divAA);
}

function showSongs(result) {
  result.forEach((song) => {
    const container = document.createElement("div");
    container.className = "d-flex justify-content-between align-items-center song p-2";

    const div1 = document.createElement("div");
    div1.className = "d-flex align-items-center";

    const divImg = document.createElement("div");
    divImg.className = "me-2";
    divImg.style = "width: 50px; height: 50px";
    const img = document.createElement("img");
    img.className = "w-100";
    img.src = song.album.cover_small;

    const divName = document.createElement("div");
    const name = document.createElement("p");
    name.className = "mb-0";
    name.innerHTML = song.title;

    const songArt = document.createElement("p");
    songArt.className = "fs-8 mb-0";
    songArt.innerHTML = song.artist.name;

    const divDur = document.createElement("div");
    const duration = document.createElement("p");
    duration.className = "mb-0 ms-auto";
    const resto = song.duration % 60 < 10 ? "0" + (song.duration % 60) : song.duration % 60;
    duration.innerHTML = `${parseInt(song.duration / 60)}:${resto}`;

    divImg.appendChild(img);
    divName.appendChild(name);
    divDur.appendChild(duration);

    divName.appendChild(songArt);
    div1.appendChild(divImg);
    div1.appendChild(divName);

    container.appendChild(div1);
    container.appendChild(divDur);

    resultPage.appendChild(container);

    container.addEventListener("click", function () {
      const footerImg = document.getElementById("footerImg").querySelector("img");
      footerImg.src = song.album.cover_small;
      const footerSong = document.getElementById("footerSong").querySelectorAll("p");
      footerSong[0].innerHTML = song.title;
      footerSong[1].innerHTML = song.artist.name;
      const audioContainer = document.getElementById("audioPlayer");
      audioContainer.src = song.preview;
      const progressBar = document.getElementById("progressBar");
      progressBar.style.width = 0;
      const playPauseBtn = document.getElementById("playPauseBtn");
      const audio = document.getElementById("audioPlayer");
      audio.play();
      playPauseBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
    });
  });
}

function openArtistPage(id) {
  window.location.assign("./artist.html?artistId=" + id);
}

function openAlbumPage(id) {
  window.location.assign("./album.html?albumId=" + id);
}

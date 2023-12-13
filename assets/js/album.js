const url = "https://deezerdevs-deezer.p.rapidapi.com/album/";
const albumId = new URLSearchParams(window.location.search).get("albumId");
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": token,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.addEventListener("DOMContentLoaded", () => {
  fetch(url + albumId, options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((obj) => {
      showCover(obj);
      showResults(obj.tracks.data);
      console.log(obj);
    });
  console.log(id);
});

const songDiv = document.getElementById("song");

let i = 1;
function showResults(album) {
  album.forEach((song) => {
    const tr = document.createElement("tr");
    tr.className = "song";
    const td1 = document.createElement("td");
    td1.innerHTML = i;
    const divArtist = document.createElement("div");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    divArtist.appendChild(p1);
    divArtist.appendChild(p2);
    const td2 = document.createElement("td");
    td2.appendChild(divArtist);
    p1.innerHTML = song.title;
    p2.innerHTML = song.artist.name;
    p1.className = "mb-0";
    p2.className = "mb-0 fs-8";
    const td3 = document.createElement("td");
    const p = document.createElement("p");
    p.className = "mb-0";
    const views = Math.round(Math.random() * 700000) + 3000000;
    p.innerHTML = views;
    td3.appendChild(p);
    const td4 = document.createElement("td");
    const duration = document.createElement("p");
    duration.className = "mb-0 ms-auto";
    const resto = song.duration % 60 < 10 ? "0" + (song.duration % 60) : song.duration % 60;
    duration.innerHTML = `${parseInt(song.duration / 60)}:${resto}`;
    td4.appendChild(duration);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    songDiv.appendChild(tr);
    tr.addEventListener("click", function () {
      const footerImg = document.getElementById("footerImg").querySelector("img");
      footerImg.src = song.album["cover_small"];
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
    i += 1;
  });
}

function showCover(album) {
  const coverBg = document.getElementById("currentAlbum");
  coverBg.style = `background-image: url()`;

  const img = document.getElementById("currentAlbum").querySelector("img");
  img.src = album.cover_medium;

  const title = document.getElementById("info").querySelector("h1");
  title.innerHTML = album.title;

  const photoArt = document.getElementById("photoArt").querySelector("img");
  photoArt.src = album.artist.picture_small;

  const description = document.getElementById("photoArt").querySelector("p");
  const resto = album.duration % 60 < 10 ? "0" + (album.duration % 60) : album.duration % 60;
  description.innerHTML = `
  ${album.artist.name} • 
  ${album.release_date.split("-")[0]} • 
  ${album.nb_tracks} brani, 
  ${parseInt(album.duration / 60)} min ${resto} sec.`;
}

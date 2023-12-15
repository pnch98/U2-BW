const albumId = new URLSearchParams(window.location.search).get("albumId");

const url = "https://deezerdevs-deezer.p.rapidapi.com/album/";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": token,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

window.addEventListener("DOMContentLoaded", () => {
  if (albumId == "liked") {
    showCover(likedSongs);
    showResults(likedSongs);
  } else {
    fetch(url + albumId, options)
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((obj) => {
        showCover(obj);
        showResults(obj.tracks.data);
      });
  }
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
    td3.className = "tabTitle";
    const p = document.createElement("p");
    p.className = "mb-0";
    const views = Math.round(Math.random() * 700000) + 3000000;
    p.innerHTML = views;
    td3.appendChild(p);

    const td4 = document.createElement("td");
    td4.style = "width: 60px";

    if (albumId !== "liked") {
      // se non siamo nella playlist brani che ti piacciono, creo td4 col cuore bianco e faccio tutte le funzioni
      td4.innerHTML = '<i class="bi bi-heart d-none"></i>';
      // al caricamento della pagina controlla se una o piÃ¹ canzoni dell'album sono incluse in localstorage. In caso, mette cuore pieno
      likedSongs.forEach((track) => {
        if (track.id == song.id) {
          td4.innerHTML = '<i class="bi bi-heart-fill d-none"></i>';
        }
      });

      td4.addEventListener("click", () => {
        // creo l'oggetto da salvare in localstorage
        const trackObj = {
          id: song.id,
          title: song.title,
          artist: {
            name: song.artist.name,
          },
          album: {
            cover_medium: song.album.cover_medium,
          },
          duration: song.duration,
          preview: song.preview,
        };

        if (td4.innerHTML == '<i class="bi bi-heart"></i>') {
          td4.innerHTML = '<i class="bi bi-heart-fill"></i>';

          likedSongs.push(trackObj);
          localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
          console.log(likedSongs);
        } else {
          td4.innerHTML = '<i class="bi bi-heart"></i>';
          likedSongs.forEach((track) => {
            if (track.id == song.id) {
              const indexSong = likedSongs.indexOf(track);
              console.log("index: " + indexSong + " " + track);
              likedSongs.splice(indexSong, 1);
              localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
            }
          });
        }
      });
      tr.addEventListener("mouseover", () => {
        tr.style = "cursor: pointer";
        td4.firstChild.classList.remove("d-none");
        td6.firstChild.classList.remove("d-none");
      });

      tr.addEventListener("mouseout", () => {
        td4.firstChild.classList.add("d-none");
        td6.firstChild.classList.add("d-none");
      });
    } else {
      tr.style = "cursor: pointer";
      td4.innerHTML = '<i class="bi bi-heart-fill text-spotify-green"></i>';
      td4.addEventListener("click", () => {
        if (td4.innerHTML == '<i class="bi bi-heart-fill text-spotify-green"></i>') {
          console.log("nice");
          td4.innerHTML == '<i class="bi bi-heart-fill d-none"></i>';
          likedSongs.forEach((track) => {
            if (track.id == song.id) {
              const indexSong = likedSongs.indexOf(track);
              likedSongs.splice(indexSong, 1);
              localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
            }
          });
          window.location.reload();
        }
      });
    }
    const td5 = document.createElement("td");
    td5.className = "tabTitle";
    const duration = document.createElement("p");
    duration.className = "mb-0 ms-auto";
    const resto = song.duration % 60 < 10 ? "0" + (song.duration % 60) : song.duration % 60;
    duration.innerHTML = `${parseInt(song.duration / 60)}:${resto}`;
    td5.appendChild(duration);

    const td5a = document.createElement("td");
    td5a.className = "tabTitleMob";
    const dot = document.createElement("i");
    dot.innerHTML = `<i class="bi bi-three-dots-vertical"></i>`;

    td5a.appendChild(dot);

    const td6 = document.createElement("td");
    td6.style = "width: 60px";
    td6.innerHTML = '<i class="bi bi-three-dots d-none"></i>';

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tr.appendChild(td5);
    tr.appendChild(td5a);
    tr.appendChild(td6);

    songDiv.appendChild(tr);

    td2.addEventListener("click", function () {
      const footerImg = document.getElementById("footerImg").querySelector("img");
      footerImg.src = song.album.cover_medium;
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

  const btnPlayFirst = document.getElementById("btnPlay");
  btnPlayFirst.addEventListener("click", function () {
    const footerImg = document.getElementById("footerImg").querySelector("img");
    footerImg.src = album[0].album.cover_medium;
    const footerSong = document.getElementById("footerSong").querySelectorAll("p");
    footerSong[0].innerHTML = album[0].title;
    footerSong[1].innerHTML = album[0].artist.name;
    const audioContainer = document.getElementById("audioPlayer");
    audioContainer.src = album[0].preview;
    const progressBar = document.getElementById("progressBar");
    progressBar.style.width = 0;
    const playPauseBtn = document.getElementById("playPauseBtn");
    const audio = document.getElementById("audioPlayer");
    audio.play();
    playPauseBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
  });
}

function showCover(album) {
  const img = document.getElementById("currentAlbum").querySelector("img");
  const title = document.getElementById("info").querySelector("h1");
  const description = document.getElementById("photoArt").querySelector("p");
  const resto = album.duration % 60 < 10 ? "0" + (album.duration % 60) : album.duration % 60;
  const photoArt = document.getElementById("photoArt").querySelector("img");

  if (albumId == "liked") {
    img.src = "./assets/imgs/liked-songs.png";
    title.innerText = "Brani che ti piacciono!";
    photoArt.style = "display: none";
    photoArt.closest("div").style = "display: none";

    description.innerHTML = `
    Dai tuoi artisti preferiti! • 
    ${album.length} brani`;

    const divAlbum = document.getElementById("coverBackAlbum");
    divAlbum.style = `background-color: rgba(117,96,234,254)`;
    const divSongs = document.getElementById("playAlbum");
    divSongs.style = `background: linear-gradient(rgba(117,96,234,0.8) 0%, rgba(29,29,29,255) 40%)`;
  } else {
    img.src = album.cover_medium;
    title.innerHTML = album.title;

    photoArt.src = album.artist.picture_small;

    description.innerHTML = `
    ${album.artist.name} • 
    ${album.release_date.split("-")[0]} • 
    ${album.nb_tracks} brani, 
    ${parseInt(album.duration / 60)} min ${resto} sec.`;

    showColor(album.cover_medium);
  }
}

function showColor(albumCover) {
  const colorThief = new ColorThief();
  const image = new Image();
  let divAlbum = document.getElementById("coverBackAlbum");
  let divSongs = document.getElementById("playAlbum");
  image.src = albumCover;
  image.crossOrigin = "Anonymous";
  let color;

  // Make sure image is finished loading
  if (image.complete) {
    color = colorThief.getColor(image);
    divAlbum = document.getElementById("coverBackAlbum");
    divAlbum.style = `background-color: rgba(${color.join(",")})`;
    divSongs.style = `background: linear-gradient(rgba(${color.join(",")},0.8) 0%, rgba(29,29,29,255) 40%)`;
  } else {
    image.addEventListener("load", function () {
      color = colorThief.getColor(image);
      divAlbum = document.getElementById("coverBackAlbum");
      divAlbum.style = `background-color: rgba(${color.join(",")})`;
      divSongs.style = `background: linear-gradient(rgba(${color.join(",")}, 0.8) 0%, rgba(29,29,29,255) 40%)`;
    });
  }
}

const newPlaylist = document.getElementById("createPlaylist");
const playlists = document.getElementById("playlists");
const input = document.getElementById("inputForm");

newPlaylist.addEventListener("click", () => {
  input.classList.remove("d-none");
});

const form = document.getElementById("playlistForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const p = document.createElement("p");
  p.innerHTML = input.value;
  playlists.appendChild(p);
  input.classList.add("d-none");
  input.value = "";
});

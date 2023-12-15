const newPlaylist = document.getElementById("createPlaylist");
const sidePlaylists = document.getElementById("sidePlaylists");
const input = document.getElementById("inputForm");

newPlaylist.addEventListener("click", () => {
  input.classList.remove("d-none");
});

const form = document.getElementById("playlistForm");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const p = document.createElement("p");
  p.innerHTML = input.value;
  sidePlaylists.appendChild(p);
  input.classList.add("d-none");
  input.value = "";
});

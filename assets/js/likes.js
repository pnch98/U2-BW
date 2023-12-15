let likedSongs = [];

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("likedSongs")) {
    likedSongs = JSON.parse(localStorage.getItem("likedSongs"));
    console.log("from likes.js: ", likedSongs);
  }
});

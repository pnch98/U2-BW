let likedSongs = []; // dichiaro l'array vuoto

// if (localStorage.getItem("likedSongs")) {
//   // controlla se nel local storage è già presente un array che contiene canzoni a cui l'utente ha messo mi piace
//   likedSongs = JSON.parse(localStorage.getItem("likedSongs"));
//   //prendiamo l'array del localstorage che è in formato stringa, splittiamo la stringa alla virgola
//   //   const str = Array.from(localStorage.getItem("likedSongs").split(","));  //ritorna un array con gli id sotto forma di stringa

//   //   str.forEach((id) => {
//   //     likedSongs.push(parseInt(id)); // per ogni id (sotto forma di stringa) lo parsiamo ad intero e lo pushiamo nel nostro array di likedSongs
//   //   });
// }
window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("likedSongs")) {
    likedSongs = JSON.parse(localStorage.getItem("likedSongs"));
    console.log("from likes.js: ", likedSongs);
  }
});

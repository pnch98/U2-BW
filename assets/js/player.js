document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audioPlayer");
  const progressBar = document.getElementById("progressBar");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const volumeInput = document.getElementById("myRange");

  playPauseBtn.addEventListener("click", function () {
    if (audio.paused) {
      audio.play();
      playPauseBtn.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
    } else {
      audio.pause();
      playPauseBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    }
  });

  audio.addEventListener("timeupdate", function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progress}%`;
  });

  audio.addEventListener("ended", function () {
    playPauseBtn.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
    progressBar.style.width = "0%";
  });

  volumeInput.addEventListener("input", function () {
    audio.volume = parseFloat(volumeInput.value);
  });
});

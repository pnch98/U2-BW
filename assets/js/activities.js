const closeBar = document.getElementById("activitiesBtn");
const showBtn = document.getElementById("showBtn");
const asideElement = document.getElementById("aside");
closeBar.addEventListener("click", function () {
  asideElement.classList.add("d-none");
  showBtn.classList.remove("d-none");
});

showBtn.addEventListener("click", function () {
  showBtn.classList.add("d-none");
  asideElement.classList.remove("d-none");
});

let saluto;
const oraCorrente = new Date().getHours();

if (oraCorrente >= 5 && oraCorrente < 12) {
  saluto = "Buongiornissimo!11!!";
} else if (oraCorrente >= 12 && oraCorrente < 18) {
  saluto = "Buon pomeriggio!";
} else {
  saluto = "Buonasera!";
}
document.getElementById("buonasera").querySelector("h3").innerHTML = saluto;

const url = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";
const myValue = "eminem";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": token,
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
  },
};

function search(value) {
  fetch(url + value, options)
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
    })
    .then((obj) => {
      for (let i = 0; i < 6; i++) {
        const col = document.createElement("col");
        const outDiv = document.createElement("div");
        outDiv.className = "d-flex rounded bg-dark align-items-center";
        outDiv.style.cursor = "pointer";

        const inDiv1 = document.createElement("div");
        inDiv1.className = "me-2 ";
        const img = document.createElement("img");
        img.className = "w-100 rounded-start";
        img.src = obj.data[i].album["cover_small"];

        const inDiv2 = document.createElement("div");
        inDiv2.className = "d-flex fs-6 m-0";

        const title = document.createElement("p");
        title.className = "mb-0";
        title.innerText = obj.data[i].title;

        inDiv2.appendChild(title);
        inDiv1.appendChild(img);
        outDiv.appendChild(inDiv1);
        outDiv.appendChild(inDiv2);
        col.appendChild(outDiv);

        const row = document.getElementById("smCards");
        row.appendChild(col);
      }
      console.log(obj.data);
    });
}
search(myValue);

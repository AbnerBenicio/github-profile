const input = document.querySelector("input");
const card = document.querySelector(".card");

let img = document.createElement("img");
img.className = "profile_img";

let nome = document.createElement("h2");
nome.className = "name";

let legend = document.createElement("h4");
let reposi = document.createElement("a");
reposi.className = "reposi";

let flws = document.createElement("div");
flws.className = "flws";
let follng = document.createElement("h4");
let follers = document.createElement("h4");
flws.appendChild(follers);
flws.appendChild(follng);

input.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    card.classList.add("active");
    selectProfile();
  }
});

async function selectProfile() {
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const res = await fetch(
    "https://api.GitHub.com/users/" + input.value,
    config
  );
  const data = await res.json();
  console.log(data);

  if (Object.keys(data).length == 2) {
    img.setAttribute("src", "./assets/img/github_logo.png");

    nome.innerText = "Perfil Inexistente";

    legend.innerText = "";
    reposi.innerText = "";

    follers.innerText = "";
    follng.innerText = "";

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(legend);
    card.appendChild(flws);
  } else {
    img.setAttribute("src", data.avatar_url);

    nome.innerText = data.name;

    legend.innerText = "Repositório: ";
    reposi.innerText = data.html_url;
    reposi.setAttribute("href", data.html_url);
    reposi.setAttribute("target", "_blank")
    legend.appendChild(reposi);

    follers.innerText = "Seguidores: " + data.followers;
    follng.innerText = "Seguindo: " + data.following;

    card.appendChild(img);
    card.appendChild(nome);
    card.appendChild(legend);
    card.appendChild(flws);
  }
}

const btn = document.querySelector("#btn");
const pita = document.querySelector("#pintar");
const favo = document.querySelector("#favo");
const star = document.querySelector("#star");
let conetenido = [];

const filtro = async (con) => {
  const ul = con;
  let rsul = [];
  ul.forEach((hijo) => {
    if (hijo.rated == "Rx") {
      rsul.push({
        title: hijo.title,
        image: hijo.image_url,
        score: hijo.score,
        sinp: hijo.synopsis,
        fin: hijo.end_date,
      });
    }
  });
  console.log(rsul);
};

btn.addEventListener("click", () => {
  const inp = document.querySelector("#name").value;
  fetch(`https://api.jikan.moe/v3/search/anime?q=${inp} `)
    .then((res) => res.json())
    .then((data) => {
      conetenido = data.results;
      pita.innerHTML = " ";
      data.results.forEach((nombre) => {
        let fill = nombre.rated;
        if (fill == "Rx") {
        } else {
          const div = document.createElement("div");
          div.setAttribute("class", "hijos");
          const {
            type,
            image_url,
            episodes,
            title,
            synopsis,
            end_date,
            rated,
            score,
            url,
          } = nombre;
          div.innerHTML = `<h2 class= 'titulo'>${title}</h2>
                            <img class='iani' src='${image_url}'>
                            <span class='epi'>${episodes} EP</span>
                            <span class='tipo'>Tipo: ${type}</span>
                            <span class='rate'>Clasificacion: ${rated}</span>
                            <span class='score'>Score: ${score}</span>
                            <Span class='fecha'>Finalizo: ${end_date}</span>
                            <p class='leyenda'>${synopsis}</p>
                            <a href="${url}" target='blanck' class='link'>${title}</a>`;

          pita.appendChild(div);
        }
      });
    });
  setTimeout(() => {
    filtro(conetenido);
  }, 1000);
});
pita.addEventListener("click", (e) => {
  console.log(e.target.innerHTML);
  if (e.target.attributes[0].value === "hijos") {
    localStorage.setItem(
      `favorito${(localStorage.length += 1)}`,
      `${e.target.innerHTML}`
    );
  }
  //   console.log(e.target.innerHTML);
});

star.addEventListener("click", () => {
  favo.classList.toggle("show");
});

addEventListener("load", () => {
  for (let index = 0; index < 100; index++) {
    const div = document.createElement("div");
    div.setAttribute("class", "favoh");

    if (localStorage.getItem(`favorito${index}`) == null) {
    } else {
      div.innerHTML = localStorage.getItem(`favorito${index}`);
      favo.appendChild(div);
    }
  }
});

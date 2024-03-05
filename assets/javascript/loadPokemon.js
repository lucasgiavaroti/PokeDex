const loadPokemon = document.getElementById("loadPokemon");

const pagUrl = window.location.href;
console.log(pagUrl);

const splitURL = pagUrl.split("=");
console.log(splitURL);

// define a variável id
let id = 0;

// caso tenha ocorrido o split e ele seja maior que 1 ocorre um pop no id, caso não tenha o valor default será 1
if (splitURL.length > 1) {
  id = splitURL.pop();
} else {
  id = 1;
}

// função para formatar o id do pokemon
function pokemonFormaterId(id) {
  if (id < 100) {
    return `#0${id}`;
  } else {
    return `#${id}`;
  }
}
// define a url que para requisição
const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
console.log(url);

// função para pegar os detalhes do pokemon e retornar no HTML
function toLoadPokemon(url) {
  pokeApi.getPokemonDetail(url).then((pokemon = []) => {
    const newHtml = `
        <div class="container">
                <div class="informations-1">
                  <img
                    width="150px"
                    src="${pokemon.photo}"
                    alt="${pokemon.name}"
                  />
                  <div class="nameAndType">
                    <span class="number-detail">${pokemonFormaterId(
                      pokemon.id
                    )}</span>
                    <span class="name-detail">${pokemon.name}</span>
                    <ol class="types">${pokemon.types
                      .map((type) => `<li class="type ${type}">${type}</li>`)
                      .join("")}
                      </ol>
                  </div>
                </div>
                <div class="informations-2">
                  <span class="stats-detail">Estatísticas</span>
                  <ul class="stats">
                  ${pokemon.stats
                    .map(
                      (stat) => `
                  <li class="stats-${stat.stat.name}">
                  <h3>${stat.stat.name}</h3>
                  <div class="progress">
                    <span>${stat.base_stat}</span>
                    <progress value="${stat.base_stat}" max="100"></progress>
                  </div>
                </li>
                  `
                    )
                    .join("")}
                  </ul>
                </div>
              </div>
            `;
    loadPokemon.innerHTML += newHtml;
  });
}
// evento de load adicionado a tela para ao carregar chamar a função acima
window.addEventListener("load", () => {
  toLoadPokemon(url);
});

// pegando a OL por ID e colocando em uma variável
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
let limit = 6;
let offset = 0;

// função para formatar o id do pokemon
function pokemonFormaterId(id) {
  if (id < 100) {
    return `#0${id}`;
  } else {
    return `#${id}`;
  }
}
function convertePokemonToLi(pokemon) {
  return `
  <a href="details.html">
  <li class="pokemon ">
    <span class="number">${pokemonFormaterId(pokemon.id)}</span>
    <span class="name">${pokemon.name}</span>
    <div class="detail">
      <ol class="types">${pokemon.types
        .map((type) => `<li class="type ${type}">${type}</li>`)
        .join("")}
      </ol>
      <img src=${pokemon.photo} alt="${pokemon.name}"/>
    </div>
  </li>
  </a>
  `;
}

// Primeira requisição -- Processamento assíncrono e funcões de callbacks
function loadPokemonItems(offset, limit) {
  pokeApi
    .getPokemons(offset, limit)
    // apos chamar o metodo getPokemons, que faz a requisição para API
    // executa esse then
    .then((pokemons = []) => {
      const newHtml = pokemons.map(convertePokemonToLi).join("");
      pokemonList.innerHTML += newHtml;
    })
    .catch((error) => console.error(error)); //se der erro retorna o erro
}
loadPokemonItems(offset, limit);

const maxRecords = 151;
loadMoreButton.addEventListener("click", () => {
  offset += limit;
  const qtdRecordWithNextPage = offset + limit;
  if (qtdRecordWithNextPage >= maxRecords) {
    const newLimit = maxRecords - offset;
    loadPokemonItems(offset, newLimit);
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  } else {
    loadPokemonItems(offset, limit);
  }
});

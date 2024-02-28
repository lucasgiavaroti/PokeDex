// objeto
const pokeApi = {};

function convertePokeApiDetailToPokemonClass(pokeDetail) {
  const pokemon = new Pokemon();

  pokemon.id = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  // array destructring
  const [type] = types; //pegando o primeiro valor do array como o principal type
  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch(pokemon.url)
    .then((response) => response.json())
    .then((pokeDetail) => pokeDetail)
    .then(convertePokeApiDetailToPokemonClass);
};

/* método do objeto com uma função como parâmetro definimos offset e limit, 
que estão default, ou seja, se alguém chamar a função e não passar nada
o offset será 0 e o limit 5*/
pokeApi.getPokemons = (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json()) //se der certo retorna essa promise como json
    .then((jsonBody) => {
      console.log(jsonBody);
      return jsonBody.results;
    }) // aqui ele vai pegar o nosso array results do jsonBody
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) // convertemos nossa lista de pokemon pra uma nova lista de pokemon de detalhes
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => {
      console.log(pokemonsDetails);
      return pokemonsDetails;
    });
};

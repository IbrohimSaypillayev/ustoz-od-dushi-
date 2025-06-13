import pokemons from "./pokemons.js";

let containerPokemons = document.querySelector('.containerPokemons');
let pokemonType = document.querySelector('#pokemonType');
let searchButton = document.getElementById('searchButton');
let searchPokemon = document.getElementById('searchPokemon');
let pokemonFilter = document.getElementById('pokemonFilter');

function generator(pokemon){
  containerPokemons.innerHTML = ''
  pokemon.forEach(element => {
      const card = document.createElement('div')
      card.classList.add('card');
      card.innerHTML = `
          <h1 class="pokemon-name">${element.name}</h1>
          <img src=${element.img} alt="" class="pokemon-img">
          <p class="pokemon-type">
              ${element.type}
          </p>
          <p class="pokemon-weight">
              ${element.weight}
          </p>
      `;
      containerPokemons.appendChild(card)
  });
}


function filterAndSortPokemons() {
  let filteredPokemons = pokemons;

  const searchValue = searchPokemon.value.toLowerCase();
  if (searchValue) {
    filteredPokemons = filteredPokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchValue)
    );
  }

  if (pokemonFilter.value === "alphabeticalAsc") {
    filteredPokemons.sort((a, b) => a.name.localeCompare(b.name));
  } else if (pokemonFilter.value === "alphabeticalDesc") {
    filteredPokemons.sort((a, b) => b.name.localeCompare(a.name));
  } else if (pokemonFilter.value === "weightAsc") {
    filteredPokemons.sort((a, b) => parseFloat(a.weight) - parseFloat(b.weight));
  } else if (pokemonFilter.value === "weightDesc") {
    filteredPokemons.sort((a, b) => parseFloat(b.weight) - parseFloat(a.weight));
  }

  const selectType = pokemonType.value.toLowerCase();
  if (selectType === "all") {
    filteredPokemons = pokemons;
  } else {
    filteredPokemons = pokemons.filter(pokemon =>
      pokemon.type.includes(pokemonType.value)
    );
  }

  generator(filteredPokemons);
}

searchButton.addEventListener("click", filterAndSortPokemons);
searchPokemon.addEve  ntListener("input", filterAndSortPokemons);

generator(pokemons);

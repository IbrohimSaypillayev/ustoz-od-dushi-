import pokemons from "./pokemons.js";

let containerPokemons = document.querySelector('.containerPokemons');
let pokemonType = document.querySelector('#pokemonType');
let searchButton = document.getElementById('searchButton');
let searchPokemon = document.getElementById('searchPokemon');
let pokemonFilter = document.getElementById('pokemonFilter');

// Karta yaratish funksiyasi
function generator(pokemonList) {
  containerPokemons.innerHTML = '';
  pokemonList.forEach(pokemon => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h1 class="pokemon-name">${pokemon.name}</h1>
      <img src="${pokemon.img}" alt="${pokemon.name}" class="pokemon-img">
      <div class="pokemon-type">
        <p>${pokemon.type}</p>
      </div>
      <p class="pokemon-weight">${pokemon.weight}</p>
    `;
    containerPokemons.appendChild(card);
  });
}

// Filtrlash va saralash funksiyasi
function filterAndSortPokemons() {
  let filtered = [...pokemons];

  // Qidirish
  const searchValue = searchPokemon.value.toLowerCase().trim();
  if (searchValue) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(searchValue));
  }

  // Type bo‘yicha filtr
  const selectedType = pokemonType.value;
  if (selectedType !== "all") {
    filtered = filtered.filter(p => p.type.includes(selectedType));
  }

  // Saralash
  switch (pokemonFilter.value) {
    case "alphabeticalAsc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "alphabeticalDesc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "weightAsc":
      filtered.sort((a, b) =>
        parseFloat(a.weight.replace(" kg", "")) - parseFloat(b.weight.replace(" kg", ""))
      );
      break;
    case "weightDesc":
      filtered.sort((a, b) =>
        parseFloat(b.weight.replace(" kg", "")) - parseFloat(a.weight.replace(" kg", ""))
      );
      break;
  }

  generator(filtered);
}

// Eventlar
searchButton.addEventListener("click", filterAndSortPokemons);
searchPokemon.addEventListener("input", filterAndSortPokemons);
pokemonType.addEventListener("change", filterAndSortPokemons);
pokemonFilter.addEventListener("change", filterAndSortPokemons);

// Boshlanishida barcha pokémonlarni chiqarish
generator(pokemons);

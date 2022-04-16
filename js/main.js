"use strict";

const url = `https://pokeapi.co/api/v2/pokemon/`;

const getPokemon = async (id) => {
  const getPokemonUrl = (id) => `${url + id}`;

  const response = await fetch(getPokemonUrl(id));

  const bodyJson = await response.json();

  return bodyJson;
};

async function getAllPoke(qtd) {
  const pokemonPromises = [];

  for (let i = 1; i <= qtd; i++) {
    const poke = await getPokemon(i);
    pokemonPromises.push(poke);
  }

  return pokemonPromises;
}

async function filterPokemon() {
  const qtddPoke = await getAllPoke(151)
  const arrPoke = qtddPoke.map((element) => {

    let pokemon = {
        photo: element.sprites.front_default,
        name: element.name,
        id: element.id,
        types: element.types.map(obj => {
            return obj.type.name            
        })
    };

    return pokemon
  });

  return arrPoke
}


async function  createCard() {
    const container = document.querySelector(".container")
    const arrayPokemons = await filterPokemon()  

        const cards = arrayPokemons.map(pokemon =>{
            const div = document.createElement("div")
            div.className ="card"
            const card = `
            
                <div class="img">
                <img class="card-image" 
                alt="${pokemon.name}" 
                src="${pokemon.photo}" />
                </div>        
                <div class="atributos">
                <h2 class="card-title">${pokemon.id}- ${pokemon.name}</h2>
                <p class="card=subtitle">${pokemon.types.join(" | ")}</p>
                </div>
    
            `
            div.innerHTML = card
            return div
        })

    cards.forEach(element =>{
        container.appendChild(element)
    })
}

createCard();

function getInputValue(input){
    return input.value
}

function pesquisarPokemon(){
    const input = document.querySelector("#btnPesquisar")
    const inputVal = getInputValue(input)
    const container = document.querySelector(".container")
}

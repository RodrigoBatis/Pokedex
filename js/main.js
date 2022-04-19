"use strict";

import {url, getAllPoke, pesquisarPokemon, filterPokemon, getPokemon} from "./pokemon.js";

const button = document.querySelector("#btnPesquisar");
const caixaTxt = document.querySelector(".inputName");

async function createCard(arrPokemon) {
  const container = document.querySelector(".container");
  const arrayPokemons = await arrPokemon;

  const cards = arrayPokemons.map((pokemon) => {
    const div = document.createElement("div");
    div.className = "card";
    const card = `
            
                <div class="img">
                <img class="card-image" 
                alt="${pokemon.name}" 
                src="${pokemon.photo}" />
                </div>        
                <div class="atributos">
                <h2 class="card-title">${pokemon.id}- ${pokemon.name}</h2>
                <p class="card-subtitle">${pokemon.types.join(" | ")}</p>
                </div>
    
            `;
    div.innerHTML = card;
    return div;
  });

  cards.forEach((element) => {
    container.appendChild(element);
  });
}

button.addEventListener("click", async (event) => {
  event.preventDefault()
  const inputVal = getInputValue(caixaTxt).toLowerCase();
  const pokemon= await pesquisarPokemon(inputVal);
  aplicarPokemonPesquisado(pokemon)
  event.stopPropagation()
});

function getInputValue(input) {
  return input.value;
}

function aplicarPokemonPesquisado(body) {
  const container = document.querySelector(".container");
  
  let pokemon = [{
    photo: body.sprites.front_default,
    name: body.name,
    id: body.id,
    types: body.types.map((obj) => {
      return obj.type.name;
    }),
  }];
  const card = createCard(pokemon) 
  container.replaceChildren(card)
}

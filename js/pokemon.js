"use strict";

export const url = `https://pokeapi.co/api/v2/pokemon/`;

export async function getAllPoke(qtd) {
  const pokemonPromises = [];

  for (let i = 1; i <= qtd; i++) {
    const poke = await getPokemon(i);
    pokemonPromises.push(poke);
  }

  return pokemonPromises;
}

export async function filterPokemon() {
  const qtddPoke = await getAllPoke(151);
  const arrPoke = qtddPoke.map((element) => {
    let pokemon = {
      photo: element.sprites.front_default,
      name: element.name,
      id: element.id,
      types: element.types.map((obj) => {
        return obj.type.name;
      }),
    };

    return pokemon;
  });

  return arrPoke;
}

export const getPokemon = async (id) => {
  const getPokemonUrl = (id) => `${url + id}`;

  const response = await fetch(getPokemonUrl(id));

  const bodyJson = await response.json();

  return bodyJson;
};

export async function pesquisarPokemon(pokemon) {
  try {
    const getPromise = await fetch(url + pokemon);
    const body = await getPromise.json();
    return body;
  } catch (error) {
    window.alert("Ocorreu um erro ao pesquisar o pokemon");
    caixaTxt.value = "";
    throw new Error("valor pesquisado não suportado pela API");
  }
}

'use strict'

const pesquisarPoke = () =>{

    const getPokemonurl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i =1; i<=151; i++){
        pokemonPromises.push(fetch(getPokemonurl(i)).then(response => response.json()))
    }
    Promise.all(pokemonPromises)
    .then(pokemons => {
        const lisPokemons = pokemons.reduce((acumulador ,pokemon) => {

            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            acumulador += 
            `<div class="card">
                <div class ="img">
                <img class ="card-image ${types[0]}" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
                </div>
                <div class ="atributos">
                <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                <p class="card=subtitle">${types.join(' | ')}</p>
                </div>
                
            </div>`
            return acumulador
        }, '')
        const ul = document.querySelector('[data-js="pokedex"]')
       
        ul.innerHTML = lisPokemons
    })
}

pesquisarPoke()


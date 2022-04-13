'use strict'

const url =`https://pokeapi.co/api/v2/pokemon/`

const pesquisarPoke = (id) =>{

    const getPokemon = id => `${url + id}`

    const response = fetch(getPokemon(id)).then(response => response.json())

    return response;
    
}

function getAllPoke() {
    const pokemonPromises = []

    for (let i =1; i<=151; i++){
       
        pokemonPromises.push( pesquisarPoke(i))
    }

    return pokemonPromises;
}

function getPromise(){
   return Promise.all(getAllPoke())
}

async function filterPokemon(){
    const arrayPromise = await getPromise()
    console.log(arrayPromise)
    const arrPoke = arrayPromise.map(element => {
        let pokemon = {
            photo: element.sprites.front_default,
            name: element.name,
            id: element.id,
            type1: element.types[0].type.name,
            type2: element.types[1].type.name
        }
         console.log(element)
        // console.log(pokemon)
    })
}

function createCard() {

}

filterPokemon();



// console.log(arrayPromise[0].sprites.front_default)
    // console.log(arrayPromise[0].name)
    // console.log(arrayPromise[0].id)
    // console.log(arrayPromise[0].types[0].type.name)
    // console.log(arrayPromise[0].types[1].type.name)




//  Promise.all(pokemonPromises)
//     .then(pokemons => {
//         const lisPokemons = pokemons.reduce((acumulador ,pokemon) => {

//             const types = pokemon.types.map(typeInfo => typeInfo.type.name)
//             acumulador += 
//             `<div class="card">
//                 <div class ="img">
//                 <img class ="card-image ${types[0]}" alt="${pokemon.name}" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" />
//                 </div>
//                 <div class ="atributos">
//                 <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
//                 <p class="card=subtitle">${types.join(' | ')}</p>
//                 </div>
                
//             </div>`
//             return acumulador
//         }, '')
//         const ul = document.querySelector('[data-js="pokedex"]')
       
//         ul.innerHTML = lisPokemons
//     })
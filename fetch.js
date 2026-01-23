// fetch.js
const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const outputEL = document.querySelector("#output");
let results = null;
async function getPokemon(url) {
  const response = await fetch(url);
  //check to see if the fetch was successful
  if (response.ok) {
    // the API will send us JSON...but we have to convert the response before we can use it
    // .json() also returns a promise...so we await it as well.
    const data = await response.json();
    doStuff(data);
  }
}

function pokemonTemplate(pokemon){
    return `
    <h2>${pokemon.name}</h2>
    <img src="${pokemon.sprites.other.home.front_default}" alt = "image of ${pokemon.name}">
    `
}

function doStuff(data) {
  results = data;
  const html = pokemonTemplate(data)
  outputEL.innerHTML = html;
  console.log("first: ", results);
}

getPokemon(url);
console.log("second: ", results);
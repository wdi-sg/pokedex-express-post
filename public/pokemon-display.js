console.log("we are reading our js file");
let pokemonImage = document.getElementsByClassName("img-pokemon-main")[0];
let bulbasaurImg = pokedex.pokemon[0].img
pokemonImage.setAttribute("src",bulbasaurImg);
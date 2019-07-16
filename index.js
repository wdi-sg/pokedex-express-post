const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Functions
 * ===================================
 */

const addPokemonForm = (request, response) => {
  let form = '';
  form = '<html>' +
      '<body>'+
      '<h1>animal form</h1>'+
      '<form method="POST" action="/pokemon">'+
      '<input name="name" placeholder="name" required/><br>'+
      '<input name="img" placeholder="img" required/><br>'+
      '<input name="height" placeholder="height (m)" required/><br>'+
      '<input name="weight" placeholder="weight (kg)" required/><br>'+
      '<button>Submit</button>'+
      '</form>'+
      '</body>'+
      '</html>';
  response.send(form);
}
const addPokemon = (request,response) => {
    let newPokemon = request.body;
    let existing = false;
    jsonfile.readFile(FILE, (err,obj)=> {
        if (err){
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;
            for (let pokemon of pokedex){
                if (pokemon.id === parseInt(newPokemon.id) || pokemon.num === newPokemon.num){
                    console.log(pokemon.id);
                    existing = true;
                    break;
                }
            }
            if (!existing) {
                let lastKey = obj.lastKey + 1;
                let pokemonObject = {
                    "id": lastKey,
                    "num": lastKey.toString(),
                    "name": newPokemon.name,
                    "img": newPokemon.img,
                    "height": newPokemon.height+" m",
                    "weight": newPokemon.weight+" kg"
                }
                obj.pokemon.push(pokemonObject);
                obj.lastKey = lastKey;
                jsonfile.writeFile(FILE, obj, (err) =>{
                    response.send(`<h2>Added ${newPokemon.name}</h2>`);
                })
            }
            else {
                response.send("The Pokemon ID or num have already been taken.");
            }
        }
    })
}

const showPokemon = (request, response) => {
    let sortby = request.query.sortby;
    let content = '<h2>List of Pokemon</h2>'+
        '<form>'+
        '<select name="sortby">'+
        '<option disabled selected>Select an option</option>'+
        '<option value="id">ID</option>'+
        '<option value="name">Name</option>'+
        '<option value="weight">Weight</option>'+
        '<option value="height">Height</option>'+
        '</select>'+
        '<button>Sort by</button>'+
        '</form>';

    jsonfile.readFile(FILE, (err,obj)=> {
        if (err){
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;

            if (sortby) {
                content+='<h4>Sorted by '+sortby+'</h4>';
                switch (sortby) {
                    case "id":
                        pokedex.sort(sortByID);
                        break;
                    case "name":
                        pokedex.sort(sortByName);
                        break;
                    case "weight":
                        pokedex.sort(sortByWeight);
                        break;
                    case "height":
                        pokedex.sort(sortByHeight);
                        break;
                }
            }
            for (let pokemon of pokedex){
                content += `<a href="/${pokemon.name}">${pokemon.name}</a><br>`;
            }
        }
        response.send(content);
    });
}

//Sort alphabetically
function sortByName(a, b) {
  // Use toUpperCase() to ignore character casing
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  let comparison = 0;
  if (nameA > nameB) {
    comparison = 1;
  } else if (nameA < nameB) {
    comparison = -1;
  }
  return comparison;
}

//Sort by ID
function sortByID(a, b) {
  const indexA = a.id;
  const indexB = b.id;

  let comparison = 0;
  if (indexA > indexB) {
    comparison = 1;
  } else if (indexA < indexB) {
    comparison = -1;
  }
  return comparison;
}
//Sort by Weight
function sortByWeight(a, b) {
  const indexA = parseInt(a.weight);
  const indexB = parseInt(b.weight);

  let comparison = 0;
  if (indexA > indexB) {
    comparison = 1;
  } else if (indexA < indexB) {
    comparison = -1;
  }
  return comparison;
}
//Sort by Height
function sortByHeight(a, b) {
  const indexA = parseInt(a.height);
  const indexB = parseInt(b.height);

  let comparison = 0;
  if (indexA > indexB) {
    comparison = 1;
  } else if (indexA < indexB) {
    comparison = -1;
  }
  return comparison;
}
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', addPokemonForm);

app.post('/pokemon', addPokemon);

app.get('/', showPokemon);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
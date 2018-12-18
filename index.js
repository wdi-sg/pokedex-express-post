const express = require('express');
const jsonfile = require('jsonfile');
const path = require('path');

const FILE = 'pokedex.json';

var publicPath = path.resolve(__dirname, 'public');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
// app.use(express.static(publicPath));

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

function sortByName() {

  var pokemon = jsonfile.readFileSync(FILE, (err, pokemon) => {
    if (err) console.error(err);
  });

  pokemon = pokemon.pokemon;
  
  return pokemon.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
}

function sortByHeight() {

  var pokemon = jsonfile.readFileSync(FILE, (err, pokemon) => {
    if (err) console.error(err);
  });

  pokemon = pokemon.pokemon;
  
  return pokemon.sort(function(a, b) {
    var heightA = parseFloat(a.height.replace("m","").trim()); // ignore upper and lowercase
    var heightB = parseFloat(b.height.replace("m","").trim()); // ignore upper and lowercase

    if (heightA < heightB) {
      return -1;
    }
    if (heightA > heightB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
    
}

function sortByWeight() {

  var pokemon = jsonfile.readFileSync(FILE, (err, pokemon) => {
    if (err) console.error(err);
  });

  pokemon = pokemon.pokemon;
  
  return pokemon.sort(function(a, b) {
    var weightA = parseFloat(a.weight.replace("m","").trim()); // ignore upper and lowercase
    var weightB = parseFloat(b.weight.replace("m","").trim()); // ignore upper and lowercase
    
    if (weightA < weightB) {
      return -1;
    }
    if (weightA > weightB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  });
}


/**
 * 
 * ===================================
 * Routes
 * ===================================
 */
function getPokemnoDetail(rec) {

  var result = "<body style='width: 80%; margin: auto'>";
  result = result + 
  '<header style = "text-align: center;">' +
  '<h1 style="width: 800px; text-align: center;"> Welcome to Pokedex</h1>' +
  '</header>'+
  '<form  method="post" action="/?sortBy"> ' + 
    
            '<label style="font-size: 20px;" for="choice">Choose your sorting option : </label>' +
            '<select style="font-size: 20px;" name="choice" id="choice">' +
                '<option style="font-size: 16px;" value="">--Please choose your option--</option>' +
                '<option style="font-size: 16px;" value="name">Sort By Name</option>' +
                '<option style="font-size: 16px;" value="height">Sort By Height</option>' +
                '<option style="font-size: 16px;" value="weight">Sort By Weight</option>' +
            '</select>' +
        
    '<input type="submit" name="sortByName" style="padding: 5px; font-size: 1rem;  font-weight: bold; margin-left: 30px; outline: none; background-color: red; color: white; border-radius: 5px; width: 70px;" value="Sort" onclick="redirect();" >' +
  '</form>'

  for (var i = 0; i < rec.length; i++) {

    result = result + 
      `<div style="display: inline-block; width: 380px; border: 2px solid blue; background-color: rgb(194, 236, 245); ">
      <h1 style="width: 380px; text-align: center; line-height: 16px; margin-bottom: 5px; font-size: 24px;">${rec[i].name}</h1>
      <div>
      <div style="display:inline-block; width=380px;">
      <img src='${rec[i].img}' alt='${rec[i].name} width: 120px; height: 120px;'>
      </div>
      <div style="display:inline-block; margin-left: 20px; width=200px;">
      <p>Candy : ${rec[i].candy}</p>
      <p>Height : ${rec[i].height}</p>
      <p>Weight : ${rec[i].weight}</p>
      </div>
      </div>
      </div>
      `
  }

  result = result + "</body>";

  return result
}

app.post('/', (request, response) => {

  if (request.body.choice === "name") {
    var pokemon = sortByName();
  } else if (request.body.choice === "height") {
    var pokemon = sortByHeight();
  } else {
    var pokemon = sortByWeight();
  }

  var html = getPokemnoDetail(pokemon);
    response.send(html);
}) 

app.get('/', (request, response) => {

  
  var pokemon = jsonfile.readFileSync(FILE, (err, pokemon) => {
    if (err) console.error(err);
  });

  var html = getPokemnoDetail(pokemon.pokemon);

  response.send(html);
});

app.get('/pokemon/new', (request, response) => {

  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/html');
  response.sendFile(publicPath + '/index.html');
});

app.post('/pokemon', (request, response) => {

  jsonfile.readFile(FILE, (err, pokemon) => {
    if (err) console.error(err);

    
    let existingPokemon = getPokemon(request.body.id, pokemon);

    if (existingPokemon === undefined) {
      pokeItem = {
        id: 0,
        num: 0,
        name: "",
        img: "",
        height: "",
        weight: "g",
        candy: "",
        egg: "",
        avg_spawns: 0,
        spawn_time: ""
      }
  
      var id = request.body.id;
  
      pokemon.index.lastkey = parseInt(pokemon.index.lastkey)+1;
      pokeItem.id = parseInt(pokemon.index.lastkey);
      pokeItem.num = String(pokeItem.id);
      pokeItem.name = request.body.name;
      pokeItem.img = request.body.img;
      pokeItem.height = parseFloat(request.body.height) + " m";
      pokeItem.weight = parseFloat(request.body.weight) + " kg"
  
      pokemon.pokemon.push(pokeItem);

      jsonfile.writeFile(FILE, pokemon, (err) => {

        if (err) {

          // send 404 back
          response.status(404);
          response.send(err);
        } else {
          response.status(200);
          response.send("New Pokemon added Successful");
        }
      });
    } else {
      response.status(404);
      response.send("Pokemon Exist, please choose another ID");
    }

  });
});

function getPokemon(id, obj) {
  var pokemon;

  // find pokemon by id from the pokedex json file
  for (let i = 0; i < obj.pokemon.length; i++) {

    let currentPokemon = obj.pokemon[i];

    if (parseInt(currentPokemon.id) === parseInt(id)) {
      pokemon = currentPokemon;
      break;
    }
  }

  return pokemon
}

app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt(request.params.id);

    let pokemon = getPokemon(inputId, obj);

    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    } else {
      response.send(pokemon);
    }
  });
});

// app.get('/', (request, response) => {
//   response.send("yay");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
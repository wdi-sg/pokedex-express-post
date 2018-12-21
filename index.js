const express = require('express');
const jsonfile = require('jsonfile');
const path = require('path');

const FILE = 'pokedex.json';

var publicPath = path.resolve(__dirname, 'public');
var port = process.env.PORT || 3000;
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
app.use(express.static(publicPath));

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets handlebars to be the default view engine
app.set('view engine', 'jsx');

// Functions

var pokemon = jsonfile.readFileSync(FILE, (err, pokemon) => {
  if (err) console.error(err);
});

function getPokemon(id, obj) {
  var pokemonItem;

  // find pokemon by id from the pokedex json file
  for (let i = 0; i < obj.pokemon.length; i++) {

    let currentPokemon = obj.pokemon[i];

    if (parseInt(currentPokemon.id) === parseInt(id)) {
      pokemonItem = currentPokemon;
      break;
    }
  }

  return pokemonItem
}

function sortByName() {

  // var pokemon = jsonfile.readFileSync(FILE, (err, pokemon) => {
  //   if (err) console.error(err);
  // });

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

  // var pokemon = jsonfile.readFileSync(FILE, (err, pokemon) => {
  //   if (err) console.error(err);
  // });

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

  // var pokemon = jsonfile.readFileSync(FILE, (err, pokemon) => {
  //   if (err) console.error(err);
  // });

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

app.get('/', (request, response) => {

  
  var pokemonList;
  if (request.query.choice) {
      if (request.query.choice === "name") {
        var pokemonList = sortByName();
      } else if (request.query.choice === "height") {
        var pokemonList = sortByHeight();
      } else {
        var pokemonList = sortByWeight();
      }

      // html = getPokemnoDetail(pokemon);
      // pokemonList = pokemon;
        // response.send(html);
  } else {
 
      // var pokemon = jsonfile.readFileSync(FILE, (err, pokemon) => {
      //   if (err) console.error(err);
      // });

      // html = getPokemnoDetail(pokemon.pokemon);
      pokemonList = pokemon.pokemon;
  }

  // response.send(html);
  response.render('PokemonDetails', {pokemonList: pokemonList});

});

app.get("/pokemon/:id/edit", (request, response) => {
  

  var pokemonItem = getPokemon(request.params.id, pokemon)

  // //read the file in and write out to it
  response.render('PokemonEdit', {pokemonItem: pokemonItem});
  
});

app.put("/pokemon/:id", (request, response) => {
  
  //read the file in and write out to it
  response.send("i waz ere")
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


app.get('/:id', (request, response) => {

  // get json from specified file
  // jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt(request.params.id);

    let pokemonItem = getPokemon(inputId, pokemon);

    if (pokemonItem === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    } else {
      response.send(pokemonItem);
    }
  // });
});



// app.get('/', (request, response) => {
//   response.send("yay");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(port, () => console.log(`~~~ Tuning in to the waves of port ${port} ~~~`));
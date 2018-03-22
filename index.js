const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
let pokedex;
jsonfile.readFile(FILE, (err, obj) => {
  pokedex = obj;
})

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.static('public'))

/**
 * ===================================
 * Routes
 * ===================================
 */
app.get('/new', (request, response) => {
  response.render('new_pokemon');
})

app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {
      // send 404 back
      response.render('404');
    } else {
      let context = {
        pokemon: pokemon
      };

      // send html file back with pokemon's data
      response.render('pokemon', context);
    }
  });
});

app.get('/', (request, response) => {
  let sortBy = request.query.sortby || "id";
  pokedex.pokemon.sort((first, second) => {
    if (first[sortBy] < second[sortBy]) return -1;
    if (first[sortBy] > second[sortBy]) return 1;
    return 0;
  })
  response.render('home', pokedex);
})

app.post('/', (request, response) => {
  let newId = pokedex.pokemon[pokedex.pokemon.length - 1].id + 1;
  let newPokemon = {};
  newPokemon["id"] = newId;
  newPokemon["num"] = newId.toString();
  Object.assign(newPokemon, request.body);
  pokedex.pokemon.push(newPokemon);
  jsonfile.writeFile(FILE, pokedex, {spaces: 2}, (err) => {
    console.log(err);
  })
  response.end("New Pokemon added successfully!");
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

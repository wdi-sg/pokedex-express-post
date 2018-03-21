"use strict";

const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const FILE = 'pokedex.json';
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static('public'));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/new', (request, response) => {
  response.render('new_pokemon');
});

app.post('/', (request, response) => {
  let newPokemon = request.body;
  jsonfile.readFile(FILE, (err, obj) => {
    newPokemon.id = obj.pokemon.length + 1;
    newPokemon.num = obj.pokemon.length + 1;
    obj.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, obj, (err) => {
      response.send("SUCCESS!");
    });
  });
});

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
      pokemon = [pokemon];
      let context = {
        pokemon: pokemon
      };

      // send html file back with pokemon's data
      response.render('pokemon', context);
    }
  });
});

app.get('/', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    let pokemon = obj.pokemon;
    if (request.query.sortby === "name") {
      pokemon.sort((a, b) => {
        if (a.name > b.name)
            return 1;
        else if (a.name < b.name)
            return -1;
        else return 0;
      });
    }
    let context = {
      pokemon: pokemon
    };

    // send html file back with pokemon's data
    response.render('pokemon', context);

  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// test = [{name:'Ponyta'},{name:''},{name:'Bulbasaur'},{name:'Articuno'}];

// test.sort((a,b) => {
//   return b.name < a.name;
// });
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
const bodyParser = require('body-parser');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */
  
jsonfile.readFile(FILE, (err, obj) => {

  app.post('/pokemon/new', (request, response) => {

  let input = request.body;
  input.id = parseInt(input.id);
  console.log(input)


  let pokemonData = obj.pokemon;
  pokemonData.push(input);


  jsonfile.writeFile(FILE, obj, (err) => {
    console.error(err);

    response.send(obj);

  });
  
  // response.send(pokemonData);


  });

// app.get('/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = request.params.id;

//     // find pokemon by id from the pokedex json file
//     // (note: find() is a built-in method of JavaScript arrays)
//     let pokemon = obj.pokemon.find((currentPokemon) => {
//       return currentPokemon.id === parseInt(inputId, 10);
//     });

//     if (pokemon === undefined) {

//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {

//       response.send(pokemon);
//     }
//   });
// });

  app.get('/', (request, response) => {
    response.send("yay");
  });

});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

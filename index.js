const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
const json = require('./pokedex.json');
console.log(json.pokemon[0]);

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

 // tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});

app.get('/', (request, response) => {
    response.send('<h1>Pokemon</h1>'+
                  '<form method="post" action="/pokemon/new">'+
                  'ID:<input type="text" name="id">'+
                  'Num:<input type="text" name="num">'+
                  'Name:<input type="text" name="name">'+
                  'IMG:<input type="text" name="img">'+
                  'Height:<input type="text" name="height">'+
                  'Weight:<input type="text" name="weight">'+
                  '<input type="submit" value="Submit">'+
                  '</form>');

    // response.send(json.pokemon);

});

// app.get('/pokemon/new', (request, response) => {
//     response.send("herro")
// });

app.post('/pokemon/new', function(req, res) {
  //debug code (output request body)
  console.log(req.body.id);
  let pokemonId = req.body.id;
  pokemonId = parseInt(pokemonId - 1);
  res.send(json.pokemon[pokemonId]);
  console.log(pokemonId);
});

// app.get('/get', (request, response) => {
//   // render a template form here
//   response.send('<h1>SAMBAL KANG KONG</h1>'+
//                   '<form method="GET" action="/plants">'+
//                   'PLANT Name:<input type="text" name="animalname">'+
//                   '<input type="text" name="weight">'+
//                   '<input type="submit" value="Submit">'+
//                   '</form>');
// });


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
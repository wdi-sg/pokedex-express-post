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

/**
 * ===================================
 * Routes
 * ===================================
 */

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
//Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight
app.get('/pokemon/new', (request, response) => {
  let  respond =  '<h1>New Pokemon</h1>'+
                  '<form method="GET" action="/animals">'+ //this action ideally will point to another app.get or app.post function that has
                  'Pokemon ID: <input type="text" id="id">'+
                  'Pokemon Num: <input type="text" num="num">'+
                  'Pokemon Name: <input type="text" name="name">'+
                  'Pokemon Image: <input type="image" img="img">'+
                  'Height: <input type="number" height="height">'+
                  'Weight: <input type="number" weight="weight">'+
                  '<input type="submit" value="Submit">'+
                  '</form>';
  response.send(respond);
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

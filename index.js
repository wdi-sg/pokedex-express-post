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

app.get('/', (request, response) => {
  response.send("yay");
});

app.get('/pokemon/new', (request, response)=>{
    let respond =   '<form method="POST" action="/pokemon">'+
    'pokemon:<input type="text" name="name" placeholder="Pokemon name">'+
    '<input type="text" name="height" placeholder="Height">'+
    '<input type="text" name="weight" placeholder="Weight">'+
    '<input type="text" name="id" placeholder="id">'+
    '<input type="text" name="num" placeholder="Num">'+
    '<input type="text" name="img" placeholder="Img">'+
    '<input type="submit" value="Submit">'+
    '</form>';
    response.send(respond);
});


 app.post('/pokemon', function(request, response) {

  // we are recieving data
  console.log( "this is request body:",request.body );
  let newPokemon = request.body;
  newPokemon.id = parseInt(newPokemon.id, 10)

    jsonfile.readFile(FILE, (err, obj) => {
        // create new list item
        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {
          if (err) { console.log(err) };
        });
      });
  response.send(newPokemon);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
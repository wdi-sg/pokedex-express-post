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

var createHtmlPagePokemon = function(request, response){
    jsonfile.readFile(FILE, (err, obj) =>{
        var newEmpArray = [];
        var pokemonObj = obj.pokemon;
        for (let i = 0; i < pokemonObj.length; i++){
            var html = '<html><body><h1>Form for new pokemon: </h1>';
            html += '<form method="POST">';
            html += 'Id Number:<br> <input type="text" id="id"><br>';
            html += 'Number:<br> <input type="text" num="num"><br>';
            html += 'Name:<br> <input type="text" name="name"><br>';
            html += 'Image:<br> <input type="text" img="img"><br>';
            html += 'Height:<br> <input type="text" height="height"><br>';
            html += 'Weight:<br> <input type="text" weight="weight"><br>';
            html += '<input type="submit" value="Submit"><br>';
            html += '</form></body></html>';

            response.send(html);
        }
    })
}

app.get('/new', createHtmlPagePokemon);

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

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

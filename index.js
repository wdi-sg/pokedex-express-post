const express = require('express');
const jsonfile = require('jsonfile');


// Init express app
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));



const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */



/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:id', (request, response) => {

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
  response.send(` <form method="POST" action="/pokemon/:new">
              Submit New Pokemon: <br/>
              ID:
              <input type="number" name="id"/> <br/>
              Number:
              <input type="number" name="num"/> <br/>
              Name:
              <input type="text" name="name"/> <br/>
              Image URL:
              <input type="url" name="img"/> <br/>
              Height:
              <input type="number" name="height"/> <br/>
              Weight:
              <input type="number" name="weight"/> <br/>

              <input type="submit" value="Submit"/>
            </form>`);

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
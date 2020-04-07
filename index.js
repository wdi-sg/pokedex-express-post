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

// tell your app to use the module
 app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return;
    }
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
app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading file");
      return;
    }
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

app.post('/newpokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);


  // save the request body
  jsonfile.writeFile('data.json', request.body, (err) => {
    console.error(err)

    // now look inside your json file
    response.send(request.body);
  });
});

//cannot get it to pokemon/new --> might be due to parsing of the :new.
// app.get('/pokemon/:new', (request, response)
//temporarily changed to pokeform
app.get('/pokeform', (request, response) => {
      response.send(`<form method="POST" action="/newpokemon">
      Pokemon Name:

      <input type="text" name="Pokemon ID">
      <input type="submit" value="Submit Pokemon ID">

      <input type="text" name="Pokemon Number">
      <input type="submit" value="Submit Pokemon Number">

      <input type="text" name="Pokemon Name">
      <input type="submit" value="Submit Pokemon Name">

      <input type="text" name="Pokemon Image">
      <input type="submit" value="Submit Pokemon Image URL">

      <input type="text" name="Pokemon Height">
      <input type="submit" value="Submit Pokemon Height">

      <input type="text" name="Pokemon Weight">
      <input type="submit" value="Submit Pokemon Weight">
  </form>`)
});

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
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

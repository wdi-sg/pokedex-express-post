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


app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

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

app.post('/pokemon', (request,response) => {
    console.log(request.body);
    jsonfile.readFile(FILE, (err,obj) => {
        obj.pokemon.push(request.body);
        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err);
        });
    });
})

app.get('/pokemon/new', (request,response) => {
    response.send('<h1>Add a new pokemon entry</h1>' + '<form method="POST" action="/pokemon">' + '<input type="text" name="id" placeholder="id">' +'<input type="text" name="num" placeholder="num">' + '<input type="text" name="name" placeholder="name">' + '<input type="text" name="img" placeholder="img">' +'<input type="text" name="height" placeholder="height">' + '<input type="text" name="weight" placeholder="weight">' + '<input type="submit" value="submit">' + '</form>');
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
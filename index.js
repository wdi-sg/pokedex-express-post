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

app.get('/pokemon/new', (request, response) => {

  let newForm =    '<h1>New Pokemon</h1>'+
                '<form method="POST" action="/pokemon">'+
                'Pokemon:<h3>ID</h3><input type="text" name="id">'+
                '<h3>Num (same as id)</h3><input type="text" name="num">'+
                '<h3>Name</h3><input type="text" name="name">'+
                '<h3>Img</h3><input type="src" name="img">'+
                '<h3>Height</h3><input type="text" name="height">'+
                '<h3>Weight</h3><input type="text" name="weight">'+
                '<input type="submit" value="Submit">'+
                '</form>';

    response.send(newForm);
});

app.post('/pokemon', function(request, response) {
//debug code (output request body)
    console.log(request.body);
    let newPokemon = request.body;
    newPokemon.id = parseInt(newPokemon.id, 10)

    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon.push(newPokemon);
 // save the request body
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log(err)
            };
// now look inside your json file
    });
});

response.send(newPokemon);

});

app.get('/', (request, response) => {
    let  respond =  '<h1>Welcome to the online Pokedex!</h1>';

    response.send(respond);
});


 // * ===================================
 // * Listen to requests on port 3000
 // * ===================================

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
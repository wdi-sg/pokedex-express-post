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

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


/**
 * ===================================
 * Functions
 * ===================================
 */

const listAllPokemon = (request, response) => {

    let pokemonList = [];

    jsonfile.readFile(FILE, (err,obj) => {

        if(err) {
            console.log('there is an error');
            console.log(err);

        } else {

            for (let i = 0; i < obj['pokemon'].length; i ++) {
                pokemonList.push(obj['pokemon'][i].name)
            }

            response.send('List of all Pokemon in the Pokedex:' + '<br><br>' + pokemonList.join('<br>'))
        }
    });
}
/**
 * ===================================
 * Routes and Endpoints
 * ===================================
 */

app.get('/', listAllPokemon);

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

// Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight

app.get('/pokemon/new', (request, response) => {

    let form = '';

    form = '<html>' +
        '<body>'+
        '<h1>Enter Details of New Pokemon!</h1>'+
        '<form method="POST" action="/pokemon">'+
        '<p>Id</p><input name="id"/>'+
        '<p>Num</p><input name="num"/>'+
        '<p>Name</p><input name="name"/>'+
        '<p>Img Url</p><input name="imgURL"/>'+
        '<p>Height (m)</p><input name="height"/>'+
        '<p>Weight (kg)</p><input name="weight"/>'+ '<br><br>' +
        '<input type="submit"/>'+
        '</form>'+
        '</body>'+
        '</html>';

    response.send(form);
});


app.post('/pokemon', (request,response) => {

    let pokemon = request.body;
    console.log(pokemon);
    pokemon.id = parseInt(pokemon.id);

    jsonfile.readFile(FILE, (err, obj) => {
        if( err ){
          console.log("error reading file");
          console.log(err)
        }

        // Save data to pokedex.json

        if (pokemon.id < obj.pokemon.length) {
            response.status(406).send(`Sorry but that ID is incorrect! Please use ID: ${obj.pokemon.length + 1}`);

        } else {

            obj.pokemon.push(pokemon);

            jsonfile.writeFile(FILE, obj, (err) => {

                if( err ) {
                    console.log("error writing file");
                    console.log(err)
                    response.status(503).send("no!");

                } else {
                    response.send(obj.pokemon);
                }
            });
        }
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

//
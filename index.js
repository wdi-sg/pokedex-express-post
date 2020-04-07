const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';

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

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/pokemon/new', (request, response) => {
    //debug code (output request body)
    console.log(request.body);

    let newPokemonId = request.body.id;
    let newPokemonNum = request.body.num;
    let newPokemonName = request.body.name;
    let newPokemonHeight = request.body.height;
    let newPokemonWeight = request.body.weight;
    let newPokemonImg = request.body.img;

    let newPokemon = {
        'id': newPokemonId,
        'num': newPokemonNum,
        'name': newPokemonName,
        'height': newPokemonHeight,
        'weight': newPokemonWeight,
        'img': newPokemonImg
    }

    jsonfile.readFile(file, (err, obj) => {

        obj.pokemon.push(newPokemon);

        // save the request body
        jsonfile.writeFile(file, obj, (err) => {
            console.error(err)

            // now look inside your json file
            response.send(request.body);
        });
    });
});

app.get('/pokemon/new', (request, response) => {
    response.render('form');
});

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {

    // check to make sure the file was properly read
    if( err ) {
      console.log("error with json read file:", err);
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


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
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

// this line below, sets a layout look to your express project
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

/*app.get('/pokemon/:id', (request, response) => {

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
});*/

// GET method to display all pokemons by default - Seems like have problem displaying all
/*app.get('/pokemon/', (request, response) => {

    // Read the file and display
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {

        response.render('pokedex.json');
    });
});*/

// GET method to get all the form elements for display
app.get('/pokemon/new', (request, response) => {

    // Render a form
    response.render('form');
});

// POST method to save the form data
app.post('/pokemon', (request, response) => {

    jsonfile.writeFile('pokedex.json', request.body, (err) => {

        response.send(request.body);

    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

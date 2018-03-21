/**
 * ===================================
 * Import libraries
 * ===================================
 */
 // Express Library
const express = require('express');

// Express Handlebar Library
const handlebars = require('express-handlebars');

// Jsonfile Library
const jsonfile = require('jsonfile');

// Body-parser Library
const bodyParser = require('body-parser');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const app = express();
const FILE = 'pokedex.json';

// Serving css static files
app.use(express.static('css'));

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

// tell your app to use the module
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */
 // Display form to create new pokemon
 app.get('/new', (request, response) => {
   response.render('newPokemon');
 });

// Display Homepage
 app.get('/home', (request, response) => {
   response.render('home');
 });

 // Handle get request to sort the pokemons by name


 // Handle post request to create new pokemon
 app.post('/', (request, response) => {
   //debug code (output request body)
   console.log(request.body);

   jsonfile.readFile(FILE, (err, obj) => {
     // Create new id and num for the pokemon
     let pokemon_length = obj.pokemon.length + 1;
     request.body.id = pokemon_length;
     request.body.num = pokemon_length;
     obj.pokemon.push(request.body);

     // save the request body
     jsonfile.writeFile(FILE, obj, (err) => {
       console.error(err)

       // now look inside your json file
       response.send(request.body);
     });
   });
 });

 // Display pokemon stats of a particular pokemon
app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {
      // send 404 back
      response.render('404');
    } else {
      let context = {
        pokemon: pokemon
      };

      // send html file back with pokemon's data
      response.render('pokemon', context);
    }
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

const jsonfile = require('jsonfile');
const express = require('express');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

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
    }

    else {
      let context = {
        pokemon: pokemon
      };

      // send html file back with pokemon's data
      response.render('pokemon', context);
    }
  });
});

`Expose a new endpoint that intercepts GET requests to /new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight`
app.get('/', (request, response) => {
  // render a handlebars template form here
  response.render('home');
});

`Point the form to submit data to the root route (/) using POST method (for the id and num fields, just input long, random numbers for now)`
app.post('/new', function(request, response) {

  //debug code (output request body)
  console.log(request.body);

  // save the request body
  // now look inside your json file

`  Expose a new endpoint that intercepts POST requests to /, which parses the form data and saves the new pokemon data into pokedex.json`
  jsonfile.readFile('pokedex.json', function(err, obj) {

    obj.pokemon.push(request.body);
    jsonfile.writeFile('pokedex.json', obj, (err) => {
      console.error(err);
    });

  });

  response.send(request.body);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

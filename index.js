const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

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

// create new pokemon data
//=========================
app.post('/', (request, response) => {

  //debug code (output request body)
  console.log(request.body);

  jsonfile.readFile(FILE, (err, obj) => {
    // input from user
    let inputPokeData = request.body;

    // push user input into pokedex
    obj.pokemon.push(inputPokeData);

    // write new pokedex info into orginal database
    jsonfile.writeFile(FILE, obj, (err) => {
      console.error(err)

      // now look inside your json file
      response.send(request.body);
    });
  });
});

/*
  // save the request body
  jsonfile.writeFile('newData.json', newPokeData, (err) => {
    console.error(err)

    // now look inside your json file
    response.send(request.body);
  });
});
*/

app.get('/new', (request, response) => {
  // get form details
  response.render('createPokemon');
});

// basic find pokemon data
//=========================
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


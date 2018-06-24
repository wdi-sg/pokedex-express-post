const express = require('express');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const FILE = 'pokedex.json';

// Init express app
const app = express();

//Use public folder for publicly availble static files.
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))


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
      response.status(404);
      response.send("not found");
    } else {
      response.send(pokemon);
    }
  });
});


app.get('/', (request, response) => {
  response.send("Welcome to the Pokedex!");
});


//Intercept /pokemon/new with a form
app.get('/pokemon/new', (request, response) => {
  response.send('<form method="POST" action="/pokemon">' +  
              '<input type="text" name="id" placeholder="id"/>' +
              '<input type="text" name="num" placeholder="num"/>' +
              '<input type="text" name="name" placeholder="name"/>' +
              '<input type="text" name="img" placeholder="img"/>' +
              '<input type="text" name="height" placeholder="height"/>' +
              '<input type="text" name="weight" placeholder="weight"/>' +
              '<input type="submit" value="Create">' +
              '</form>');
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

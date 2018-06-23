const express = require('express');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const FILE = 'pokedex.json';
const path = require('path');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride('_method'));
app.use(express.static('public'))

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
      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});

app.get('/pokemon/new', (req, res) => {
  res.sendFile(path.join(__dirname, '/public', 'form.html'));
})
app.post('/pokemon', (req, res) => {
  console.log(req.body);
  jsonfile.readFile(FILE, (err, obj) => {
    obj["pokemon"].push(req.body);
    const newData = obj;
    jsonfile.writeFile(FILE, newData, (err) =>{
      console.error(err);
    })
  })
  res.sendFile(path.join(__dirname, '/public', 'success.html'));
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

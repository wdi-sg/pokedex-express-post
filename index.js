const express = require('express');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser')
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
app.use(express.static('public'));
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

app.get('/pokemon/new', (request, response) =>{
  response.send( '<form>'+
      'Id: <input type="text" name="Id">'+ 
      'num: <input type="text" name="num">'+ 
      'Name: <input type="text" name="name">'+ 
      'Image: <input type="text" name="img">'+ 
      'Height: <input type="text" name="weight">'+ 
      'Weight: <input type="text" name="height">'+ 
      '<button>Submit</button>'+
      '</form>')
});

app.post('/pokemon', submitPokeData);

function submitPokeData(request, response) {
  let newPokemon = {};
  newPokemon.id = request.body.id;
  newPokemon.num = request.body.num;
  newPokemon.name = request.body.name;
  newPokemon.img = request.body.img;
  newPokemon.height = request.body.height;
  newPokemon.weight = request.body.weight;
  
  jsonfile.writeFile('pokedex.json', newPokemon, function (err) {
    //console.error(err)
  });
}


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
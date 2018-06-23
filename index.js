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
const bodyParser = require('body-parser');

app.use(express.static('public'));

// Set up method-override for PUT and DELETE forms
var methodOverride = require('method-override')
app.use(methodOverride('_method'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */
  
jsonfile.readFile(FILE, (err, obj) => {

  app.post('/pokemon/new', (request, response) => {

  let input = request.body;
  input.id = parseInt(input.id);
  input.height += ' m';
  input.weight += ' kg';
  console.log(input)


  let pokemonData = obj.pokemon;
  pokemonData.push(input);


  jsonfile.writeFile(FILE, obj, (err) => {
    console.error(err);

    response.send(obj);

  });
  // response.send(pokemonData);
  });

  app.get('/:id', (request, response) => {

    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    let pokemonName = pokemon.name;
    let pokemonId = pokemon.id;
    let pokemonNum = pokemon.num;
    let pokemonImg = '<img src="' + pokemon.img + '">';
    let pokemonHeight = pokemon.height;
    let pokemonWeight = pokemon.weight;


    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      response.send('<html><body>' + pokemonImg + '<br><h1>' + pokemonName + '</h1><ul><li>Id : ' + pokemonId + '</li><li>Num : ' + pokemonNum + '</li><li>Height : ' + pokemonHeight + '</li><li>Weight : ' + pokemonWeight + '</li></ul><br><form method="GET" action=/'+ pokemon.id + '/edit?_method=PUT><button type="submit">UPDATE</button></form><br><form method="POST" action=/{{pokemon.id}}?_method=DELETE><button type="submit">DELETE</button></form></body></html>');
    }
  });

  app.get('/:id/edit', (request, response) => {

    let pokemonIndex = parseInt(request.params.id);

    let html = '<h1>Edit Pokemon</h1><form method="POST" action="/' + pokemonIndex + '/edit?_method=PUT">Id: <input type="number" name="id"><br>Num: <input type="number" name="num"><br>Name: <input type="text" name="name"><br>Height: <input type="text" name="height"><br>Weight: <input type="text" name="weight"><br><input type="submit" value="Submit"></form>';

    response.send(html);
   
  });

  app.put('/:id/edit', (request, response) => {

    // console.log(request.params.id);
    // console.log(request.body);

    let poke = parseInt(request.params.id) - 1;

    let newValue = request.body;
    newValue.height += ' m';
    newValue.weight += ' kg';
    obj.pokemon[poke] = newValue;

    response.send("Pokemon details updated.");

    jsonfile.writeFile(FILE, obj, (err) => {
      console.error(err);

    response.send(obj);

    });
  });

  app.get('/', (request, response) => {
    response.send("yay");
  });

});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

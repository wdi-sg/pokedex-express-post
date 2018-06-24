const express = require('express');

const myjsonfile = require('jsonfile');

const bodyParser = require('body-parser');

const methodOverride = require('method-override')

const path = require('path');

const FILE = 'pokedex.json';

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

app.use(express.static('public'));

/**
 * ===================================
 * Routes
 * ===================================
 */


 // GET request to retrieve and display Pokemon data base on ID

app.get('/:id', (request, response) => {

  // get json from specified file
  myjsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file

    // extract input data from request
    let inputId = request.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {

      return currentPokemon.id === parseInt(inputId, 10);
    });

    // define conditional for response statement
    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    } 

    else {
      
      let pokeId = pokemon.id;
      let pokeNum = pokemon.num;
      let pokeName = pokemon.name;
      let pokeImg = '<img src="' + pokemon.img + '">';
      let pokeHeight = pokemon.height;
      let pokeWeight = pokemon.weight;

      response.send('<html><body><style>body{text-align:center};</style>' + pokeImg + '<br><h1>' +
        pokeName + '</h1><ul><li>ID : ' + pokeId + '</li><li>Number : ' +
        pokeNum + '</li><li>Height : ' + pokeHeight + '</li><li>Weight : ' +
        pokeWeight + '</li></ul><br><form method="GET" action=/'+ pokemon.id + '/edit?_method=PUT><input type="submit" value="Edit"></form><br><form method="POST" action=/' + pokemon.id + '/delete?_method=DELETE><input type= "submit" value= "Delete"></form></body></html>'
      )
    }
  });
});



// GET request to display POST form to CREATE

app.get('/pokemon/new', (request, response) => {
  response.sendFile(path.join(__dirname, '/public', 'form.html'))
});


// POST request to add New Pokemon data

app.post('/pokemon', (request, response) => {

  console.log(request.body);

  myjsonfile.readFile(FILE, (err, obj) => {
    let pokemonList = obj['pokemon'];

    parseInt(request.body.id);

    pokemonList.push(request.body);   // push request body into ARRAY
    
    let newObj = obj;

    myjsonfile.writeFile(FILE, newObj, (err) => {
      console.error(err);
    });
  });

  response.send('New Pokemon added!');
});



// GET request to display PUT form for UPDATE

app.get('/:id/edit', (request, response) => {

  let inputId = parseInt(request.params.id);

  response.sendFile(path.join(__dirname, '/public', 'edit.html'))
});


app.put('/:id/edit', (request, response) => {

  myjsonfile.readFile(FILE, (err, obj) => {

    //extract ID params data from request
    let inputId = request.params.id;

    // search through array for pokemon ID
    let pokemon = obj.pokemon.find((currentPokemon) => {

      return currentPokemon.id === parseInt(inputId, 10);
    });
    // replace pokemon data with new data from request.body form
    pokemon.splice(inputId, 1, request.body);

    let newObj = obj;

    myjsonfile.writeFile(FILE, newObj, (err) => {
      console.error(err);
    });
  });

  response.send('Pokemon data Updated!')
});





app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));


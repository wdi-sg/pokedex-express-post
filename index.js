const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');

const FILE = 'pokedex.json';

let pokemonNames = [];


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
// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.post('/', function(request,response) {
// console.log('entered post');
//   jsonfile.readFile(FILE, function(err, obj) {
//     object.pokemon.push(request.body)
//     console.log(request.body);
//     jsonfile.writeFile('pokedex.json', obj, (err) => {

//       console.error(err);

//       response.send(request.body);
//     });
//   });
// });

app.get('/new', (request,response) => {

  response.render('newform');
});

app.post('/', function(request,response) {
  console.log('entered post');
  jsonfile.readFile(FILE, function(err, obj) {
    obj.pokemon.push(request.body)
    console.log(request.body);
    jsonfile.writeFile('pokedex.json', obj, (err) => {

      console.error(err);

      response.send(request.body);
    });
  });
});

app.get('/', (request, response) => {

  let context = {
    pokemons:[]
  }

  jsonfile.readFile(FILE, (err, obj) => {
    let poke_length = obj.pokemon.length;

    for (var i = 0; i < poke_length; i++) {
      let poke_object = {};
      poke_object.img = obj.pokemon[i].img;
      poke_object.num = obj.pokemon[i].num;
      poke_object.name = obj.pokemon[i].name;
      context.pokemons.push(poke_object);

      if (request.query.sortby === "name") {
        
      }
    }

    response.render('home', context);
  });
});

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

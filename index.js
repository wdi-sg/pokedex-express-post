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

// Cookier Parser Library
const cookieParser = require('cookie-parser');

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

// Use the cookie parser library
app.use(cookieParser())

/**
 * ===================================
 * Routes
 * ===================================
 */
 // Handle get request to sort the pokemons by their num and id
 app.get('/home', (request, response) => {
   console.log("Entered handler to display pokemons based on their id");
   let context = {
     pokemons: []
   }
   // Read the file and display the pokemons according to their num
   jsonfile.readFile(FILE, (err, obj) => {
     let poke_length = obj.pokemon.length;

     for (var i = 0; i < poke_length; i++) {
       let poke_object = {};
       poke_object.img = obj.pokemon[i].img;
       poke_object.num = obj.pokemon[i].num;
       poke_object.name = obj.pokemon[i].name;
       context.pokemons.push(poke_object);
     }

     // now look inside your json file
     response.render('home', context);
   });
 });

 // Handle get request to sort the pokemons by their name
app.get('/', (request, response) => {
  console.log("Entered handler to display pokemons based on their name");
  // // get the currently set cookie
  // var visits = request.cookies['visits'];
  // let myname = "Edmundcjj";
  //
  // // see if there is a cookie
  // if (visits === undefined) {
  //
  //   // set a default value if it doesn't exist
  //   visits = 1;
  // } else {
  //
  //   // if a cookie exists, make a value thats 1 bigger
  //   visits = parseInt(visits) + 1;
  // }

  let context = {
    sortedPokemons: []
  }
  // Read the file and sort the pokemons by their name in alphabetical order
  jsonfile.readFile(FILE, (err, obj) => {
    // sort the pokedex data
    let sorted_array = obj.pokemon.sort(function(a, b) {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });

    let poke_length = sorted_array.length;

    for (var i = 0; i < poke_length; i++) {
      let poke_object = {};
      poke_object.img = sorted_array[i].img;
      poke_object.num = sorted_array[i].num;
      poke_object.name = sorted_array[i].name;
      context.sortedPokemons.push(poke_object);
    }

    // Render the sorted pokemons by name to the html page
    response.render('sortedPokemons', context);
  });

  // set the cookie
  // response.cookie('visits', visits);
  // response.cookie('myname', myname);
});

// Display form to create new pokemon
app.get('/new', (request, response) => {
  response.render('newPokemon');
});

// Handle post request to create new pokemon
app.post('/newpokemon', (request, response) => {
  //debug code (output request body)
  console.log(request.body);

  jsonfile.readFile(FILE, (err, obj) => {
    // Create new id and num for the pokemon
    let pokemon_length = obj.pokemon.length + 1;
    request.body.id = pokemon_length;
    request.body.num = pokemon_length;
    obj.pokemon.push(request.body);

    // save the request body
    jsonfile.writeFile(FILE, obj, {spaces: 2}, (err) => {
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

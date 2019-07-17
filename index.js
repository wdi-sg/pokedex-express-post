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

app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

let pokemonNames = [];
let sortedPokemons = [];


/**
 * ===================================
 * Routes
 * ===================================
 */

 //display a list of all pokemon names and possible selections at root route//
app.get('/', (request, response) => {
    console.log("yay");

//form for options to sort//
    let form = '';
    form = `<html>
    <body>
    <form method="GET" action="/sorting">
    <select name="sortby">
      <option value="name">Name</option>
      <option value="height">Height</option>
      <option value="weight">Weight</option>
    </select>
    <button type="submit">Sort</button>
    </form>
    </body>
    </html>`;

    jsonfile.readFile(FILE, (err, obj) => {
        console.log('reading file');
        for (let i = 0; i < obj.pokemon.length; i++) {
            console.log(pokemonNames);
            pokemonNames.push(obj.pokemon[i].name);
            console.log('names added');
        }

    response.send(form + pokemonNames);

   });
});

//respective functions to sort based on user selected parameter
app.get('/sorting', (request, response) => {
    console.log("yayee");

  jsonfile.readFile(FILE, (err, obj) => {
    if (request.query.sortby === "name") {
        obj.pokemon.sort(function (a, b) {
            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();
            if (nameA < nameB) {
                return -1;
            }
            if (nameA > nameB) {
                return 1;
            }
            return 0;
        });
        for (let i = 0; i < obj.pokemon.length; i++) {
            sortedPokemons.push(obj.pokemon[i].name);
        }
    }
    else if (request.query.sortby === "height") {
         obj.pokemon.sort(function (a, b) {
            var heightA = parseFloat(a.height);
            var heightB = parseFloat(b.height);
            return heightA - heightB;
        });
        for (let i = 0; i < obj.pokemon.length; i++) {
            sortedPokemons.push(obj.pokemon[i].name);
        }
    }
    else if (request.query.sortby === "weight") {
        obj.pokemon.sort(function (a, b) {
            var weightA = parseFloat(a.weight);
            var weightB = parseFloat(b.weight);
            return weightA - weightB;
        });
        for (let i = 0; i < obj.pokemon.length; i++) {
            sortedPokemons.push(obj.pokemon[i].name);
        }
    }

    response.send(sortedPokemons);
    // });
});
});



//get request to add new pokemon
app.get('/pokemon/new', (request, response) => {
    console.log('getting form');

    let form = '';
    form = '<html>' +
    '<body>'+
    '<h1>Form</h1>'+
//note *POST* action here//
    '<form method="POST" action="/pokemon">'+
    'ID <input type="text" name="id"`>'+
    'Num <input type="text" name="num">'+
    'Name <input type="text" name="name">'+
    'Img <input type="text" name="img">'+
    'Height <input type="text" name="height">'+
    'Weight <input type="text" name="weight">'+
    '<input type="submit" value="Submit">' +
    '</form>' +
    '</body>'+
    '</html>';

    response.send(form);
});


//post request to add new pokemon created to array
app.post('/pokemon', function(request, response) {
  console.log('whyy cannot');
  var newPokemon = request.body;
  console.log(newPokemon);
  // save the request body
  jsonfile.readFile(FILE, (err, obj) => {
    console.log('reading file');

    obj.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, obj, (err) => {
        console.error(err)
    });

  });
    response.send(newPokemon);
});

//display pokemon by its id in address bar
app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
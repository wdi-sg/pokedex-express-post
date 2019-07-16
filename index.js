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

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

var getPokemonByIdRequest = function(request,response){

  // get json from specified file
  jsonfile.readFile(FILE, (err, data) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<data.pokemon.length; i++ ){

      let currentPokemon = data.pokemon[i];

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

}

var addNewPokemonRequest = function(request,response){
  var newPokemon = request.body;
  // save in data file
  jsonfile.readFile(FILE, (err, data) => {
    if( err ){
      console.log("error reading file");
      console.log(err);
    }

    console.log(data.pokemon);

    // save data
    data.pokemon.push(newPokemon);
    // obj[key] = value;

    jsonfile.writeFile(FILE, data, (err) => {
      if( err ){
        console.log("error writing file");
        console.log(err)
      }else{
        response.send(data);
      }

    });

  });

}

var getNewPokemonRequest = function(request,response){
  jsonfile.readFile(FILE, function(err,data){
    //get the next index
    var lastIndex = data.pokemon.length + 1 ;

    var form = '<form method="POST" action="/pokemon">' +
                'Add new Pokemon:<br>' +
                '<input type="text" name="id" placeholder="id" value="' + lastIndex + '"><br>' +
                '<input type="text" name="num" placeholder="num" value="' + lastIndex + '"><br>' +
                '<input type="text" name="name" placeholder="name"><br>' +
                '<input type="text" name="img" placeholder="img"><br>' +
                '<input type="text" name="height" placeholder="height"><br>' +
                '<input type="text" name="weight" placeholder="weight"><br>' +
                '<input type="submit" value="Submit">' +
                '</form>';
    response.send(form);
  });
}

var getAllPokemonRequest = function(request,response){

  jsonfile.readFile(FILE, function(err,data){

    if(err){
      console.log("error reading file" + err);
    }

    // this is where you get all the pokemon
    var pokemonList = [];

    data.pokemon.forEach( function(item){
      pokemonList.push(item.name);
    })

    // this is where you make the buttons
    var button = '<button>Sort By Name</button>';

    // this is where you construct the html

    response.send(pokemonList.toString() + button);
  });

}

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/', getAllPokemonRequest);
app.get('/:id', getPokemonByIdRequest);
app.get('/pokemon/new', getNewPokemonRequest);
app.post('/pokemon', addNewPokemonRequest);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

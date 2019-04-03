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

//tell your app to use the module
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Helper Functions
 * ===================================
 */

 var zeroPadding = function(input) {
    var inputString = input.toString();
    if(inputString.length == 1) {
        inputString = "00" + inputString;
        return inputString;
    } else if(inputString.length == 2) {
        inputString = "0" + inputString;
        return inputString;
    } else {
        return inputString;
    }
 }

/**
 * ===================================
 * Routes
 * ===================================
 */


 app.get('/', function(request, response) {

    if(request.query.sortby === undefined) {
        response.send(`<form>
                        <select name="sortby">
                            <option value="id">id</option>
                            <option value="name">name</option>
                        </select>
                        <input type="submit" value="Sort">
                        </form>
                        <br>`);
    } else if(request.query.sortby === "name") {
        jsonfile.readFile(FILE, (err, obj) => {
        let pokemonArray = [];
        let sortedPokemonArray = [];
        let pokemonString = "";

        for(let i=0; i<obj.pokemon.length; i++) {
            let pokemonObject = {};
            pokemonObject.id = obj.pokemon[i].id;
            pokemonObject.name = obj.pokemon[i].name;
            pokemonArray.push(pokemonObject);
        }
        pokemonArray.sort(function(a, b) {
           return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
       });

        for(let i=0; i<pokemonArray.length; i++) {
            pokemonString = pokemonString + pokemonArray[i].id + ". " + pokemonArray[i].name + "<br>"
        }

        response.send(pokemonString);
    });

    } else if(request.query.sortby === "id") {
        jsonfile.readFile(FILE, (err, obj) => {
        let pokemonArray = [];
        let sortedPokemonArray = [];
        let pokemonString = "";

        for(let i=0; i<obj.pokemon.length; i++) {
            let pokemonObject = {};
            pokemonObject.id = obj.pokemon[i].id;
            pokemonObject.name = obj.pokemon[i].name;
            pokemonArray.push(pokemonObject);
        }
        pokemonArray.sort(function(a, b) {
           return a.id - b.id;
       });

        for(let i=0; i<pokemonArray.length; i++) {
            pokemonString = pokemonString + pokemonArray[i].id + ". " + pokemonArray[i].name + "<br>"
        }

        response.send(pokemonString);
    });

    }

//closing brace for line 30
 });

 app.get('/pokemon/new', function(request, response) {

    let respond = '<html><h1>Create a new pokemon!</h1><br><h1>Please enter the pokemon details</h1><form method="POST" action="/pokemon">Enter id: <input type="text" name="id"><br> Enter num: <input type="text" name="num"><br> Enter name: <input type="text" name="name"><br>Enter img: <input type="text" name="img"><br>Enter height: <input type="text" name="height"><br>Enter weight: <input type="text" name="weight"><br><input type="submit" value="Submit"></form></html>'

    response.send(respond);

 });


 app.post('/pokemon', function(request, response) {

    console.log(request.body);

    jsonfile.readFile(FILE, (err, obj) => {

     let newPokemon = request.body;

     newPokemon.id = obj.pokemon.length + 1;
     newPokemon.num = zeroPadding(obj.pokemon.length + 1);
     newPokemon.candy = "None ";
     newPokemon.candy_count = 0;
     newPokemon.egg = "Not in Eggs";
     newPokemon.avg_spawns = 0;
     newPokemon.spawn_time = "N/A";

     console.log(newPokemon);

     obj.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, obj, (err) => {
        response.send(`<h1>A new pokemon ${request.body.name} was added!</h1>`);

        console.log("JSON updated with new data!");
    });
});

 })


app.get('/delete/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    var inputId = parseInt( request.params.id );


    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      var currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
        obj.pokemon.splice(i,1);
      }
    }

    jsonfile.writeFile(FILE, obj, (err) => {

        response.send(`${currentPokemon.name} removed!`);
        console.log("JSON updated! Pokemon removed!");
    });

  });
});



app.get('/:id', (request, response) => {

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
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

// Tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/pokemon', function(request, response) {

  //debug code (output request body)
  console.log(request.body);

  response.send(request.body);

  jsonfile.readFile(FILE, (err, obj) => {

        obj["pokemon"].push(request.body);
            // console.log(array);

     jsonfile.writeFile(FILE, obj, (err) => {
    console.log(err)
  });

  })

});



app.get('/pokemon/new', (request, response) => {

let  respond =  '<h1>New Pokémon</h1>'+
                  '<form method="POST" action="/pokemon">'+

                  'Id:<input type="number" name="id">'+
                  'Num:<input type="text" name="num">'+
                  'Name: <input type="text" name="name">'+
                  'Image: <input type="text" name="img">'+
                  'Height: <input type="text" name="height">'+
                  'Weight: <input type="text" name="weight">'+

                  '<input type="submit" value="Submit">'+
                  '</form>';

  response.send(respond);

})


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

app.get('/', (request, response) => {


//at the root route (GET request) `/` display a list of all the pokemons in the pokedex

    var pokemonNames = [];

    jsonfile.readFile(FILE, (err, obj) => {


        for (var i = 0; i < obj["pokemon"].length; i++) {
            pokemonNames.push(obj["pokemon"][i]["name"]);
        }

        // console.log(pokemonNames);
        response.send(
            'Sort Pokémon:'+
            '<form>'+
            '<form method="POST" action="/pokemon/?sortby=name">'+
                '<select>'+
                    '<option value="">--Please choose an option--</option>' +

                    '<option value="name">Name</option>' +

                    '<option value="id">Id</option>' +
                    '<option value="num">Number</option>' +
                    '<option value="weight">Weight</option>' +
                    '<option value="height">Height</option>' +
                '<input type="submit" value="Submit">'+
                '</select>' +
            '</form>' +


            "These are all the Pokémon: " + '<br>' +pokemonNames.join(', ')
            );
    });


});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
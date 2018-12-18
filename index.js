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



//      Create form       //
app.get('/pokemon/new', (request, response) => {
    let form =
    "<html>"+
    "<body>" +
    '<form action="/pokemon" method="POST">' +
        'Id: <br>'+
        '<input type="number" name="id"/><br>' +
        'Num: <br>'+
        '<input type="text" name="num"/><br>' +
        'Name: <br>'+
        '<input type="text" name="name"/><br>' +
        'Img: <br>'+
        '<input type="text" name="img"/><br>' +
        'Height: <br>'+
        '<input type="text" name="height"/><br>' +
        'Weight: <br>'+
        '<input type="text" name="weight"/><br>' +
        '<br>'+
        '<input type="submit"/>' +
    "</form>" +
    "</body>" +
    "</html>";

  response.send(form);
});



//      Post to JSON file       //
app.post('/pokemon', (request, response) => {

    var newPokemon = request.body;

    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {

            console.error(err);
            response.send(newPokemon);
        });
    });
});



//At the root route (GET request) / display a list of all the pokemons in the pokedex
app.get('/', (request, response) => {

//  Read pokedex.json
    jsonfile.readFile(FILE, (err, obj) => {

//  Create sort button
        let sortButton =
        '<form action="/" method="GET">' +
            '<input type="button" value="Sort By Name"/>' +
        '</form>';

//  Display a list off all the pokemons in the pokedex
        let listOfPokemon = '';
        obj.pokemon.forEach((element, index) => { listOfPokemon += (`${index+1}. ${element.name}<br>`) });
        response.send(`List of Pokemons: ${sortButton} ${listOfPokemon}`);
    });

});




app.get('/?sortby=name', (request, response) => {

//  Read pokedex.json
    jsonfile.readFile(FILE, (err, obj) => {

//  Display a list off all the pokemons in the pokedex
        let sortedByAlpha = '';
        obj.pokemon.forEach((element, index) => { sortedByAlpha += (`${index+1}. ${element.name}<br>`) });
        response.send(`List of Pokemons: ${sortButton} ${sortedByAlpha.sort()}`);
    });

})






/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

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

// get a specified pokemon's details by ID
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

// respond with a HTML page with a form that has these fields: id, num, name, img, height, and weight
app.get('/pokemon/new', (request, response) => {
    let  newForm =  "<h1>Let's create a new Pokemon!</h1>"+
                  '<form method="POST" action="/pokemon">'+
                  'Pokemon Details:'+'<br>'+
                  '<br>'+
                  'ID: <input type="text" name="id">'+'<br>'+
                  'Num: <input type="text" name="num" placeholder="enter a 3-digit number">'+'<br>'+
                  'Name: <input type="text" name="name">'+'<br>'+
                  'Image link: <input type="text" name="img">'+'<br>'+
                  'Height: <input type="text" name="height">'+'<br>'+
                  'Weight: <input type="text" name="weight">'+'<br>'+
                  '<br>' +
                  '<input type="submit" value="Submit">'+
                  '</form>';

    response.send(newForm);
});

// parse the form data and save the new pokemon data into pokedex.json
app.post('/pokemon', function(request, response) {

    // console.log(request.body);
    let newPokemon = request.body;
    // change id from string to integer
    newPokemon.id = parseInt(newPokemon.id, 10)

    // save the request body
    jsonfile.readFile(FILE, (err, obj) => {
        // create new list item
        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) { console.log(err) };
        });
    });

    // now look inside your json file
    response.send(newPokemon);
});

// default
app.get('/', (request, response) => {

    let pokemonList = [];

    // checks how user wants list of pokemon sorted
    let selectSort = `<form method="get" action="/?">
                  Sort pokemon by:
                  <select name="sortby">
                  <option value="name">Name</option>
                  <option value="id">ID</option>
                  </select>
                  <input type="submit" value="Submit">
                  </form>`;
                  // http://expressjs.com/en/api.html#req.query
                  // console.log(request.query.sortby)

    // get list of pokemon
    jsonfile.readFile(FILE, (err, obj) => {
        // create new list item for each pokemon
        if (request.query.sortby === "name"){
            for (let pokemon of obj.pokemon){
                pokemonList.push(`<li>${pokemon.name}</li>`);
                // default sort will arrange by UTF-16 code units order
                pokemonList.sort();
            }
        }
        else if (request.query.sortby === "id"){
            for (let pokemon of obj.pokemon){
                pokemonList.push(`<li>${pokemon.id}: ${pokemon.name}</li>`);
                // To compare numbers instead of strings, the compare function can simply subtract b from a. The following function will sort the array ascending (if it doesn't contain Infinity and NaN)
                pokemonList.sort((a, b) => a - b);
            }
        }
        else {
            for (let pokemon of obj.pokemon){
                pokemonList.push(`<li>${pokemon.name}</li>`);
            }
        }
        // removes comma between each list item
        pokemonList = pokemonList.join('');

        let respondMessage = `<h1>Welcome to the online Pokedex!</h1>
        ${selectSort}
        <h3>Pokemon List:</h3>
        ${pokemonList}`;

        // console.log(pokemonList);
        response.send(respondMessage);
    });


});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
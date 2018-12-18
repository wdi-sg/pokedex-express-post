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


//Tell app to use the module
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}));
/**
 * ===================================
 * Routes
 * ===================================
 */

//page for user to create new pokemon (GET data from user)
app.get('/pokemon/new', (request, response) => {

    let requestForm = "<html>"+
    "<body>"+
    "<h1>Create a new Pokemon:</h1><br/>"+
        "<form method='POST' action='/pokemon'>"+
        "ID: <input type='text' name='id'><br />"+
        "Num: <input type='text' name='num'><br />"+
        "Name: <input type='text' name='name'><br />"+
        "IMG: <input type='text' value='insert image link' name='img'></br />"+
        "Height: <input type='text' name='height'><br />"+
        "Weight: <input type='text' name='weight'><br />"+
        "<input type='submit'/>"+
    "</body>"+
    "</html>";

    response.send(requestForm);
});

//uses form data from user (from requestForm) to create new Pokemon data in pokedex.json
app.post("/pokemon", (request, response) => {

//getting data from user and putting it into an obj newPokemonObj
    let newPokemonObj = {
        id: parseInt(request.body["id"]),
        num: request.body["num"],
        name: request.body["name"],
        img: request.body["img"],
        height: request.body["height"],
        weight: request.body["weight"],
    }

    console.log("newPokemonObj", newPokemonObj);

    //read json file (before writing to it)
    jsonfile.readFile(FILE, (err, obj) => {

        //what you want to be written into the json file
        obj["pokemon"].push(newPokemonObj);

        //write to the json file
        jsonfile.writeFile(FILE, obj, (err) => {
        console.error(err);

        // now, newPokemonObj has been pushed into the json file (look!)

        response.send(newPokemonObj);
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


app.get('/', (request, response) => {

    //displays list of all pokemons in the pokedex at root route
    jsonfile.readFile(FILE, (err, obj) => {

    let names = `<html><h1>List of all the Pokemons in the Pokedex: </h1></html>`;
    for (let i=0; i < obj.pokemon.length; i++) {
        // names += "- " + obj.pokemon[i].name + "<br />";
        names += `- ${obj.pokemon[i].name} <br />`;
    }
    console.log(names);

    response.send(names);

    });

    // let sortByForm = "<html>"+
    // "<body>"+
    // "<form method='GET' action='/?sortby=name'>"+
    // "<input name='sortby' value='name'/>"+
    // "<input type='submit'/>"+
    // "</form>";

    // response.send(sortByForm);

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
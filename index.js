/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const express = require('express');
const app = express();

// Init jsonfile
const jsonfile = require('jsonfile');
const file = 'pokedex.json';


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
///////////////////////////////////////////////////////////////////////////////////////////
//Get Pokemon from ID
app.get('/pokemon/:id', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {
        if (err){
            console.log(err);
        }
        else {
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
            }
            else {
                response.send(pokemon);
            }
        }
    });
});
///////////////////////////////////////////////////////////////////////////////////////////
//Write new Pokemon to JSON
app.post('/pokemon', function(request, response) {

    //debug code (output request body)
    console.log(request.body);

    let newPokemon = request.body;

    newPokemon.id = parseInt(request.body.id);
    // newPokemon.num = request.body.num;
    // newPokemon.name = request.body.name;
    // newPokemon.img = request.body.img;
    // newPokemon.height = request.body.height;
    // newPokemon.weight = request.body.weight;


    //read file
    jsonfile.readFile(file, (err, obj) => {
        if (err){
            console.log(err);
        }
        else {
            if (newPokemon.id === obj.pokemon.length+1){

                obj.pokemon.push(newPokemon);

                    //write file
                jsonfile.writeFile(file, obj, (err) => {
                    if (err !== null) {
                        console.log(err);
                    }
                    else{
                        var pokemonId = request.body.id;
                        response.redirect(`/pokemon/${pokemonId}`);
                    }
                });
            }
            else{
                response.send(`ID number should be ${obj.pokemon.length+1}`)
            }
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
//Create new Pokemon form
app.get('/pokemon/new', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {

    let form = `<html>
                <head>
                </head>
                <body>
                    <h1>Pokemon Details</h1>
                    <form method="POST" action="/pokemon">
                      ID: <input type="text" name="id"> <br>
                      Num: <input type="text" name="num"> <br>
                      Pokemon Name: <input type="text" name="name"> <br>
                      Image: <input type="text" name="img"> <br>
                      Height: <input type="text" name="height"> <br>
                      Weight: <input type="text" name="weight"> <br>
                      <input type="submit" value="Submit">
                    </form>
                 </body>
                <html>`;

      response.send(form);

  });
});

////////////////////////////////////////////////////////////////////////////////////////////
//Show Pokemon List
app.get('/', (request, response) => {

    let sortby = request.query.sortby;
    let content = `<html>
                <head>
                </head>
                <body>
                <h2>List of Pokemon</h2>
                    <form>
                        <select name="sortby">
                            <option disabled selected>Select an option</option>
                            <option value="id">ID</option>
                            <option value="name">Name</option>
                            <option value="weight">Weight</option>
                            <option value="height">Height</option>
                        </select>
                        <button>Sort by</button>
                    </form>
                </body>
                <html>`;


    jsonfile.readFile(file, (err, obj) => {
        if (err){
            console.log(err);
        }
        else {
            let pokedex = obj.pokemon;

            if (sortby) {
                content+='<h4>Sorted by '+sortby+'</h4>';
                switch (sortby) {
                    // case "id":
                    //     pokedex.sort(sortByID);
                    //     break;
                    case "name":
                        pokedex.sort(sortByName);
                        break;
                    // case "weight":
                    //     pokedex.sort(sortByWeight);
                    //     break;
                    // case "height":
                    //     pokedex.sort(sortByHeight);
                    //     break;
                }
            }
            for (let pokemon of pokedex){
                    content += `<a href="/pokemon/${pokemon.id}">${pokemon.name}</a><br>`;
            }
        }
        response.send(content);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////
//Sort Pokemon
function sortByName(){
    let list = obj.pokemon
    for(let sortedList of list){
        list.sort();
        return sortedList;
    }

}







/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

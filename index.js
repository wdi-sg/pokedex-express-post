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
const methodOverride = require('method-override')
app.use(methodOverride('_method'));
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    
    // check to make sure the file was properly read
    if( err ){
      
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return; 
    }
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

app.get('/pokemon/:id/edit', (request, response) => {
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // obj is the object from the pokedex json file
        // request
        let inputId = parseInt(request.params.id);

        var pokemon;

        // find pokemon by id from the pokedex json file
        for (let i = 0; i < obj.pokemon.length; i++) {

            let currentPokemon = obj.pokemon[i];

            if (currentPokemon.id === inputId) {
                pokemon = currentPokemon;
            }
        }

        response.render('update', pokemon);
    })
})

app.put('/pokemon/:id', (request, response) => {
    // get index of pokemon to be updated
    let updateId = parseInt(request.params.id)-1;
    let updatedPokemon = request.body;
    updatedPokemon.id = parseInt(updatedPokemon.id);

    jsonfile.readFile(FILE, (err, obj) => {
        //update pokemon with new data
        obj.pokemon.splice(updateId, 1, updatedPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err);
        })
    })

    response.send("Pokemon updated!");
})

app.get('/pokemon/:id/delete', (request, response) => {
    //input data from request
    let inputId = parseInt(request.params.id);

    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {

        var pokemon;

        // find pokemon by id from the pokedex json file
        for (let i = 0; i < obj.pokemon.length; i++) {

            let currentPokemon = obj.pokemon[i];

            if (currentPokemon.id === inputId) {
                pokemon = currentPokemon;
            }
        }

        response.render('delete', pokemon);
    })
})


app.delete('/pokemon/:id', (request, response) => {
    // pokemon to be deleted
    let deleteId = parseInt(request.params.id);

    jsonfile.readFile(FILE, (err, obj) => {
        //replace updated pokemon with new data
        var pokemon;
        var arrPokemon = [];

        // find pokemon by id
        for (let i = 0; i < obj.pokemon.length; i++) {

            arrPokemon.push(obj.pokemon[i].name);

            let currentPokemon = obj.pokemon[i];

            if (currentPokemon.id === deleteId) {
                pokemon = currentPokemon;
            }
        }

        let deleteIndex = arrayOfPokemon.indexOf(pokemon.name);
        console.log (deleteIndex + pokemon.name);
        obj.pokemon.splice(deleteIndex, 1);

        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err);
        })
        response.send(`Pokemon ${pokemon.name} deleted!`);

    })


})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

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


// Write new pokemon to file
app.post('/pokemon', function(request, response) {

    jsonfile.readFile(FILE, (err, obj) => {

        if (err) {
            console.log('error reading file');
            console.log(err);
        }

        let newPokemon = request.body;
        console.log(newPokemon);
        obj.pokemon.push(newPokemon);

        // save the request body into json file
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log('error writing file!');
                console.log(err);
                response.status(503).send("no!");
            }
        }); ////// end of writing json file //////

    });////// end of reading json file //////
    console.log("send response");
    response.send("New pokemon added!");
});




app.get('/pokemon/new', (request, response) => {

    var form = '';

    form = '<html><head><style type="text/css">form, input {font-size: 1em;padding: 10px;margin: 10px 20px;}</style></head><body><h1>Add New Pokemon</h1><form method="POST" action="/pokemon"><input type="number" name="id" placeholder="enter id"><input type="number" num="num" placeholder="enter num"><input type="text" name="name" placeholder="enter name"><input type="text" name="img" placeholder="enter img url"><input type="text" name="height" placeholder="enter height"><input type="text" name="weight" placeholder="enter weight"><input type="submit" value="Submit"></form></body></html>';

    response.send(form);
});


// make a search using: localhost:3000/route?q=name
app.get('/', (request, response) => {

    console.log("You are searching for: " + request.query.sortby);

    jsonfile.readFile(FILE, (err, obj) => {

        let pokedex = obj.pokemon;

        if (err) {
            console.log('error reading file');
            console.log(err);
        } else {

            let sortby = request.query.sortby;
            // sort by name
            if (sortby == 'name') {

            pokedex.sort(function(a, b) {

                var nameA = a.name.toUpperCase(); // ignore upper and lowercase
                var nameB = b.name.toUpperCase(); // ignore upper and lowercase
                if (nameA < nameB) {
                    return -1
                }

                if (nameB < nameA) {
                    return 1
                }

                return 0;

                });

            }
        }
        //console.log(pokedex);
        response.send(pokedex);
    }); // end of reading json file
});




// show all pokemon on pokedex
app.get('/', (request, response) => {

    jsonfile.readFile(FILE, (err, obj) => {

        let pokedex = obj.pokemon;

        if (err) {
            console.log('error reading file');
            console.log(err);
        }

        console.log(pokedex);
        response.send(pokedex);
    });
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
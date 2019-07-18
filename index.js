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

// Init React
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');


// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */

// Display all pokemon on home page using GET ///////////////////
app.get('/pokemon', (request, response) => {
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



// Display a form to create new pokemon using GET ///////////////////
app.get('/pokemon/new', (request, response) => {
    var form = '';

    form = '<html><head><style type="text/css">form, input {font-size: 1em;padding: 10px;margin: 10px 20px;}</style></head><body><h1>Add New Pokemon</h1><form method="POST" action="/pokemon"><input type="number" name="id" placeholder="enter id"><input type="number" num="num" placeholder="enter num"><input type="text" name="name" placeholder="enter name"><input type="text" name="img" placeholder="enter img url"><input type="text" name="height" placeholder="enter height"><input type="text" name="weight" placeholder="enter weight"><input type="submit" value="Submit"></form></body></html>';

    response.send(form);
});



// Write new pokemon to json file  using POST //////////////////////////
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



// Display a page for single pokemon using GET ///////////////
app.get('/pokemon/:id', (request, response) => {
    console.log("new pokemon request");
    jsonfile.readFile(FILE, (err, obj) => {
        if( err ){
          console.log("error reading file");
          console.log(err)
        }
        console.log(obj);
        var id = request.params.id;
        var selectedPokemon = obj.pokemon[id];

        // response.send(selectedPokemon);
        let data = {
            index : id,
            pokemonData : selectedPokemon
        };

        response.render('onepokemon', data);
    });
});



// Display a form for editing a specific pokemon data using GET //////////
app.get('/pokemon/:id/edit', (request, response) => {
    // read pokedex json file
     jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log('error reading file');
            console.log(err);
        }
        console.log(obj);
        var id = request.params.id;
        var pokedex = obj.pokemon[id];
        var data = {
            pokemonKey: pokedex,
            pokemonId: id
        }
        response.render('edit', data);
    });
});



// Save updated pokemon to pokedex.json file using PUT /////////////
app.put('/pokemon/:id', (request, response) => {
    console.log("WOW PUT");
    var newPokemon = request.body;
    console.log( newPokemon );
    // save in data file
    console.log("about to get file");
    jsonfile.readFile(FILE, (err, obj) => {
        console.log("got file");
        if( err ){
          console.log("error reading file");
          console.log(err)
        }
        console.log("what i currently have");
        console.log(obj.pokemon);
        // save data
        // obj.pokemon.push(pokemon);
        obj.pokemon[request.params.id] = newPokemon;
        console.log("about to write file");
        jsonfile.writeFile(FILE, obj, (err) => {
            console.log("write file done");
            if( err ){
                console.log("error writing file");
                console.log(err)
                response.status(503).send("no!");
            } else {
                console.log("~~~~~~~yay. pokemon updated!");
                console.log( "send response");
                response.send("Updated!");
            }
        });
    });
});



// Display a form to delete selected pokemon using GET //////////////
app.get('/pokemon/:id/delete', (request, response) => {
    // read pokedex json file
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log('error reading file');
            console.log(err);
        }
            console.log(obj);
            var id = request.params.id;
            var pokedex = obj.pokemon[id];
            var data = {
                pokemonKey: pokedex,
                pokemonId: id
            }
        response.render('delete', data);
    });
});



// Update json file with deleted pokemon using DELETE
app.delete('/pokemon/:id', (request, response) => {
    let id = parseInt(request.params.id);
    console.log("DELETING...");
    console.log("about to get file");
    jsonfile.readFile(FILE, (err, obj) => {
        console.log("got file");
        if( err ){
          console.log("error reading file");
          console.log(err)
        } else {
            console.log("what i currently have");
            let pokedex = obj.pokemon;
            // delete selected pokemon
            pokedex.splice(id, 1);
            // start of writing to json file
            console.log("about to write file");
            jsonfile.writeFile(FILE, obj, (err) => {
            console.log("write file done");
                if( err ){
                    console.log("error writing file");
                    console.log(err)
                    response.status(503).send("no!");
                } else {
                    console.log("~~~~~~~yay. pokemon updated!");
                    console.log( "send response");
                    response.send('Pokemon deleted');
                }
            }); // end of writing to json file
        }
    });
});




// Sort pokemon query using: http://localhost:3000/?sortby=name GET
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
            } // end of sort by name
            // start of sort by weight
            // http://localhost:3000/?sortby=weight
            if (sortby == 'weight') {
                pokedex.sort(function(a, b) {
                    // sort by weight
                    var weightA = parseFloat(a.weight);
                    var weightB = parseFloat(b.weight);
                    return weightA - weightB;
                });
            } // end of sort by weight
            // start of sort by height
            // http://localhost:3000/?sortby=height
            if (sortby == 'height') {
                pokedex.sort(function(a, b) {
                    // sort by weight
                    var heightA = parseFloat(a.height);
                    var heightB = parseFloat(b.height);
                    return heightA - heightB;
                });
            } // end of sort by height
        }
        // response.send(pokedex);
        let data = {
            pokemonKey : pokedex
        };
        response.render('home', data);
    }); // end of reading json file
});




// // Sample code to display specific pokemon
// app.get('/:id', (request, response) => {
//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );
//     var pokemon;
//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){
//       let currentPokemon = obj.pokemon[i];
//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }
//     if (pokemon === undefined) {
//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {
//       response.send(pokemon);
//     }
//   });
// });


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
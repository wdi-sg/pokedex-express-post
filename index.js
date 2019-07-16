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



app.post('/pokemon', function(request, response) {

    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log('error reading file');
            console.log(err);
        }

        let newPokemon = request.body;
        console.log(newPokemon);

        // console.log(obj.pokemon);

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
    response.send("yes!");
});


app.get('/pokemon/new', (request, response) => {

    var form = '';

    form = '<form method="POST" action="/pokemon">Pokemon Name:<input type="number" name="id" placeholder="enter id"><input type="number" name="num" placeholder="enter number"><input type="text" name="name" placeholder="enter name"><input type="text" name="img" placeholder="enter img url"><input type="text" name="height" placeholder="enter height"><input type="text" name="weight" placeholder="enter weight"><input type="text" name="candy" placeholder="enter candy type or none"><input type="text" name="egg" placeholder="enter 1km, 5km or 10km"><input type="number" name="avg_spawns" placeholder="enter 1km, 5km or 10km"><input type="time" name="spawn_time" placeholder="enter time"><input type="submit" value="Submit"></form>';

    response.send(form);
});


// Sort pokemon by name
app.get('/sort/name', (request, response) => {

    let showAllArr = [];

    jsonfile.readFile(FILE, (err, obj) => {

        if (err) {
            console.log('error reading file');
            console.log(err);
        } else {
            for (let i = 0; i < obj.pokemon.length; i++) {
                showAllArr.push(obj.pokemon[i].name);
            }
        }
        console.log(showAllArr);
        showAllArr.sort();
        response.send(showAllArr.join("<br>"));
    });
});


// show all pokemon on pokedex
app.get('/', (request, response) => {

    let showAllArr = [];

    jsonfile.readFile(FILE, (err, obj) => {

        if (err) {
            console.log('error reading file');
            console.log(err);
        } else {
            for (let i = 0; i < obj.pokemon.length; i++) {
                showAllArr.push(obj.pokemon[i].name);
            }
        }
        console.log(showAllArr);
        response.send(showAllArr.join("<br>"));
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
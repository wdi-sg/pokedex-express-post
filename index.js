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

app.get("/pokemon/new", (request, response) => {
    console.log("Getting forms");

    let form ='';
    form =  `<html>
                <body>
                    <h1>Submit new pokemon form</h1>
                        <form method = "POST" action ="/pokemon">
                            <p>id</p>
                            <input name = "id">
                            <p>num</p>
                            <input name = "num">
                            <p>name</p>
                            <input name = "name">
                            <p>img</p>
                            <input name = "img">
                            <p>height</p>
                            <input name = "height">
                            <p>weight</p>
                            <input name = "weight">
                            <input type = "Submit">
                        </form>
                </body>
            </html>`;
        response.send(form);
});

app.post('/pokemon', function(request, response) {

    console.log("passing values to newPokemon");
    var newPokemon = request.body;
    console.log(newPokemon);

    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log(err);
        }
        else {
            obj.pokemon.push(newPokemon);

            jsonfile.writeFile(FILE, obj, (err) => {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log("push complete");
                }
            })
        }
    })

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
  var showAllPokemon = [];

  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
        console.log(err);
    }
    else {
        for (let i = 0; i < obj.pokemon.length; i++) {
            showAllPokemon.push(obj.pokemon[i].name + "\n");
        }

    }
    response.send(showAllPokemon.toString());
  })

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
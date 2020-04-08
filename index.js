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

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    if (err) {

      console.log("error with json read file:", err);
      response.status(503).send("error reading filee");
      return;
    }
    // obj is the object from the pokedex json file
    // extract input data from request
    if (request.params.id === 'new') {
      response.send(
        '<form method="POST" action="/pokemon">' +
        "ID:" +
        '<input type="text" name="id">' +
        "Num:" +
        '<input type="text" name="num">' +
        "Name:" +
        '<input type="text" name="name">' +
        "Image:" +
        '<input type="text" name="img">' +
        "Height:" +
        '<input type="text" name="height">' +
        "Weight:" +
        '<input type="text" name="weight">' +
        '<input type="submit" value="Submit">' +
        "</form>"
      );
    } else {
      let inputId = parseInt(request.params.id);

      var pokemon;

      // find pokemon by id from the pokedex json file
      for (let i = 0; i < obj.pokemon.length; i++) {

        let currentPokemon = obj.pokemon[i];

        if (currentPokemon.id === inputId) {
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
    };
  });
});

// app.get('/pokemon/new', (request, response) => {

// });

app.post('/pokemon', function (request, response) {

  //debug code (output request body)
  console.log(request.body);


  // save the request body
  jsonfile.writeFile(FILE, request.body, (err) => {
    console.error(err)

    // now look inside your json file
    response.send(request.body);
  });
});

app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

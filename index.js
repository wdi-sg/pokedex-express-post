const express = require('express');
const jsonfile = require('jsonfile');
const handlebars = require('express-handlebars');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
app.use(express.static('public'))

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

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
        let inputId = request.params.id;

        // find pokemon by id from the pokedex json file
        // (note: find() is a built-in method of JavaScript arrays)
        let pokemon = obj.pokemon.find((currentPokemon) => {
            return currentPokemon.id === parseInt(inputId, 10);
        });

        if (pokemon === undefined) {

            // send 404 back
            response.status(404);
            response.send("not found");
        } else {

            response.send(pokemon);
        }
    });
});

app.get('/pokemon/new/', (request, response) => {

    response.render('newpokeform');

});

app.get('/', (request, response) => {
    response.send("Welcome To Pokedex POST");
});

app.post('/pokemon/', (request, response) => {

  jsonfile.readFile(FILE, (err, objRead) => {

    newPokemon = {
      "id": response.body.id,
      "num": response.body.num,
      "name": response.body.name,
      "img": response.body.img,
      "height": response.body.height,
      "weight": response.body.weight,
      "candy": "",
      "candy_count": "",
      "egg": "",
      "avg_spawns": "",
      "spawn_time": ""
    }

  objRead.pokemon.push(newPokemon);

  jsonfile.writeFile(FILE, (err, objWrite) => {
    objWrite = objRead;
  })
  })
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
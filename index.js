const express = require('express');
const jsonfile = require('jsonfile');

const FILE = ('pokedex.json');



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

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
    });
});
/**
 * ===================================
 * Basic Routes
 * ===================================
 */
app.get('/pokemon/new', function(request, response) {

    //make text field
    response.send(
        '<form method="POST" action="/pokemon">' +

        '<h2>POKEMON INFORMATION</h2>' +
        '<br>' +
        'id:' +
        '<input type="text" name="id">' +
        '<br>' +
        'number:' +
        '<input type="text" name="num">' +
        '<br>' +
        'pokemon name:' +
        '<input type="text" name="name">' +
        '<br>' +
        'pokemon img:' +
        '<input type="text" name="img">' +
        '<br>' +
        'pokemon height:' +
        '<input type="text" name="height">' +
        '<br>' +
        'pokemon weight:' +
        '<input type="text" name="weight">' +
        '<br>' +
        '<input type="submit" value="Submit">' +
        '</form>'
    );
});

app.post('/pokemon', function(request, response) {
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) {
            console.log(err)
        }
        let newPokemon = request.body;
        obj.pokemon.push(newPokemon);
        jsonfile.writeFile(FILE, obj, (err) => {
            console.log('done writing');
            // now look inside your json file
            response.send(newPokemon)
        });
    })
});
/**
 * ===================================
 * If URL has no request
 * ===================================
 */
app.get('/', (request, response) => {
    response.send("Don't give up!");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
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
app.use(express.json());
app.use(express.urlencoded({
 extended: true
}));
/**
 * ===================================
 * Routes
 * ===================================
 */

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


// app.get('/', (request, response) => {
//     response.send("yay");
// });

// app.get('/pokemon/', (request, response) => {
//     response.render('haha')
// })

app.get('/pokemon/new', (request, response) => {
    response.render('forms');
});

app.post('/pokemon', (request, response) => {
    console.log("EVERYTHING in the form request", request.body);
    // response.send("WOW THE POST");

    // save the request body
    jsonfile.writeFile('data.json', request.body, (err) => {
        console.error(err)

        // now look inside your json file
        response.send(request.body);
    });

});

app.get('/pokemon/:id', (request, response) => {
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


// get json from specified file



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
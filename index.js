const express = require('express');
const jsonfile = require('jsonfile');
const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.get('/', (req, res) => {
    // running this will let express to run home.handlebars file in your views folder
    res.render('layout')
})

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app

/**
 * ===================================
 * Routes
 * ===================================
 */

const file = 'pokedex.json'
//for adding new pokemon
app.get('/pokemon/new', (request, response) => {
    response.render('layout')
})
app.post('/pokemon', (request, response) => {
    console.log(request.body)
    jsonfile.readFile(file, (err, obj) => {
        let newPokemon = request.body
        console.log(newPokemon)
        obj.pokemon.push(newPokemon);
        console.log('after push')
        jsonfile.writeFile('pokedex.json', obj, (err) => {
            console.log('pushed')
            console.error(err)
            response.send("wow works!")
        })
    })
})

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


app.get('/', (request, response) => {
    response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
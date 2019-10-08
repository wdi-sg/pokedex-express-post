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

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

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

        if (pokemon === undefined || request.params.id === "new") {
            //add new pokemon if id not taken or new
            console.log("Yay, new pokemon! Gotta catch em' all!");
            response.render('new');

            // // send 404 back
            // response.status(404);
            // response.send("not found");
        } else {

            response.render('found', pokemon);
        }
    });
});

app.get('/', (request, response) => {
    response.render('home');
});

app.post('/addpokemon', (request, response) => {
    // debug code (output request body)
    console.log(request.body);
    let newPokemon = request.body;
    // check if new id = new num
    if (newPokemon.id !== newPokemon.num) {
        let wrong = { message: "ID does not match Number!" };
        response.render('new', wrong);

    } else {
        newPokemon.id = parseInt(newPokemon.id);
        let nameExist = false;

        jsonfile.readFile(FILE, (err, obj) => {
            // check if name already exist
            for (let i = 0; i < obj.pokemon.length; i++) {
                if (newPokemon.name === obj.pokemon[i].name) {
                    let wrong = { message: "Name already exist!" };
                    response.render('new', wrong);
                    nameExist = true;
                }
            }
            // save the request body
            if (nameExist === false) {
                obj.pokemon.push(newPokemon);

                jsonfile.writeFile(FILE, obj, (err) => {
                    console.error(err);

                    // render out added data
                    response.render('added', newPokemon);

                });
            }

        });
    }
})

app.get('/pokemon?', (request, response) => {
    //output query field
    console.log(request.query.sortby);
    let field = request.query.sortby;
    let results = [];

    switch (field) {
        case 'name':
            jsonfile.readFile(FILE, (err, obj) => {
                // get name of all pokemons
                for (var i = 0; i < obj.pokemon.length; i++) {
                    results.push(obj.pokemon[i].name);
                }
                // sort names alphabetically
                results.sort();
                // render out requested data
                response.send(results);

            });
            break;

        case 'height':
            jsonfile.readFile(FILE, (err, obj) => {

                for (var j = 0; j < obj.pokemon.length; j++) {
                    results.push({ name : obj.pokemon[j].name, height : obj.pokemon[j].height });
                }

                results.sort((a,b) => {
                    return parseFloat(a.height)-parseFloat(b.height);
                });
                response.send(results);
            })
            break;

        case 'weight':
            jsonfile.readFile(FILE, (err, obj) => {

                for (var j = 0; j < obj.pokemon.length; j++) {
                    results.push({ name : obj.pokemon[j].name, weight : obj.pokemon[j].weight });
                }

                results.sort((a,b) => {
                    return parseFloat(a.weight)-parseFloat(b.weight);
                });
                response.send(results);
            })
            break;
    }

})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
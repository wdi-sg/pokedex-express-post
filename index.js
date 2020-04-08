const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override')

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

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// Set up method-override for PUT and DELETE forms
app.use(methodOverride('_method'));

// check our input is valid from PUT and PUSH forms.
const isValidInput = (pokemon) => {

    // if ID is not an integer.
    if (!parseInt(pokemon.id)) {
        console.log('failed id');
        return false;
    }
    // if num is not an integer.
    if (!parseInt(pokemon.num)) {
        console.log('failed num');
        return false;
    }
    // if name is empty
    if (!pokemon.name.trim()) {
        console.log('failed name');
        return false;
    }
    // if img is empty
    if (!pokemon.img.trim()) {
        console.log('failed img');
        return false;
    }
    // if height is not a number
    if (!pokemon.height) {
        console.log('failed height');
        return false;
    }
    // if weight is not a number
    if (!pokemon.weight) {
        console.log('failed weight');
        return false;
    }

    if (!pokemon.candy) {
        console.log('failed candy');
        return false;
    }

    // if all works or is present.
    return true;

}

// This gets the pokemon details and returns it.
const retrievePokemon = (request, response, err, obj) => {

    // check to make sure the file was properly read
    if (err) {

        console.log("error with json read file:", err);
        return {
            error: "error reading file"
        };
    }
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt(request.params.id);

    let pokemon;

    // find pokemon by id from the pokedex json file
    for (let i = 0; i < obj.pokemon.length; i++) {

        let currentPokemon = obj.pokemon[i];
        console.log(currentPokemon);
        if (currentPokemon.id === inputId) {
            pokemon = currentPokemon;
        }
    }

    if (pokemon === undefined) {

        // send 404 back
        return {
            error: "Error 404 Pokemon not found"
        };

    } else {

        // render pokemon page from pokemon.jsx
        pokemon.error = null;
        return pokemon;
    }
}

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', (request, response) => {
    response.render('pokemonnew');
})

// Post to make a new pokemon
app.post('/pokemon/', (request, response) => {
    console.log('Received POST');
    console.log(request.body);

    const newPokemon = {
        id: parseInt(request.body.id),
        num: request.body.num,
        name: request.body.name,
        img: request.body.img,
        height: request.body.height,
        weight: request.body.weight,
        candy: request.body.candy
    }

    // validate the inputs here to make sure it's correct.
    if (!isValidInput(newPokemon)) {
        console.log('invalid input');
        response.status(401).send("error with input for some reason");
        return;
    }


    jsonfile.readFile(FILE, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {

            console.log("error with json read file:", err);
            response.status(503).send("error reading file");
            return;
        }

        // Temporarily going to comment out actually adding the pokemon.
        obj.pokemon.push(newPokemon);
        console.log(newPokemon);

        // Not going to write the file, change this later after checking the Pokemon exists.
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) {
                console.log(err)
            };
            console.log('successfully written ' + newPokemon);
            response.send('Successfully added new pokemon ' + newPokemon.name);
            return;
        })
    })
})

// Put to replace details of pokemon at :id
app.put('/pokemon/:id', (request, response) => {
    // console.log('Received PUT for id ' + request.params.id);
    console.log('*****************');
    console.log('Received request.body:');
    console.log(request.body);
    const newPokemon = {
        id: parseInt(request.body.id),
        num: request.body.num,
        name: request.body.name,
        img: request.body.img,
        height: request.body.height,
        weight: request.body.weight,
        candy: request.body.candy
    }

    console.log(newPokemon);

    // validate the inputs here to make sure it's correct.
    if (!isValidInput(newPokemon)) {
        console.log('invalid input');
        response.status(401).send("error with input for some reason");
        return;
    }

    jsonfile.readFile(FILE, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {

            console.log("error with json read file:", err);
            response.status(503).send("error reading file");
            return;
        }

        // Temporarily going to comment out actually adding the pokemon.
        obj.pokemon[request.params.id - 1] = newPokemon;
        console.log('pokemon edited:');
        const data = {
            message: 'Pokemon ' + newPokemon.name + ' submitted'
        };
        // response.render('home', data);

        // Not going to write the file, change this later after checking the Pokemon exists.
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) console.log(err);
            console.log('successfully written ' + newPokemon);
            response.redirect(`/pokemon/${request.params.id}`);
            return;
        });
    });
});

// get a Pokemon by ID (display the page)
app.get('/pokemon/:id', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        // get json from specified file
        const pokemonReceived = retrievePokemon(request, response, err, obj);
        const data = {
            pokemon: pokemonReceived,
        };
        // response.send('Hello ' + data.pokemon.name);
        response.render('pokemon', data);
    });
});

// get the dit page for pokemon at :id
app.get('/pokemon/:id/edit', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        // retrieve pokemon from specified file.
        const pokemonReceived = retrievePokemon(request, response, err, obj);
        const data = {
            pokemon: pokemonReceived
        };
        response.render('pokemonedit', data);
    });
})

// Test the page is working.
app.get('/', (request, response) => {
    const data = {
        message: "yay"
    };
    response.render('Home', data);
});

// catch all for a 404.
app.get('*', function(request, response) {
    const message = '404 Please try another address';
    const data = {
        message: message
    };
    response.render('Home', data);
    // response.send('Dunno lah');
})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

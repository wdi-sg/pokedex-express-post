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

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


const isValidInput = (pokemon) => {

    // if ID is not an integer.
    if (!parseInt(pokemon.id)) {
        return false;
    }
    // if num is not an integer.
    if (!parseInt(pokemon.num)) {
        return false;
    }
    // if name is empty
    if (!pokemon.name.trim()) {
        return false;
    }
    // if img is empty
    if (!pokemon.img.trim()) {
        return false;
    }
    // if height is not a number
    if (isNaN(pokemon.height)) {
        return false;
    }
    // if weight is not a number
    if (isNaN(pokemon.weight)) {
        return false;
    }

    // if all is
    return true;

}

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


app.post('/pokemon/', (request, response) => {
    console.log('Received POST');
    console.log(request.body);
    const newPokemon = {
        id: request.body.id,
        num: request.body.num,
        name: request.body.name,
        img: request.body.img,
        height: request.body.height,
        weight: request.body.weight
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
        // obj.pokemon.push(newPokemon);
        console.log('pokemon to add:');
        console.log(newPokemon);
        const data = {
            message: 'New pokemon submitted'
        };
        response.render('home', data);
        return;

        // Not going to write the file, change this later after checking the Pokemon exists.
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) console.log(err);
            console.log('successfully written ' + newPokemon);
            response.send('Successfully added new pokemon ' + newPokemon.name);
            return;
        })
    })
})


// get a Pokemon by ID.
app.get('/pokemon/:id', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        // get json from specified file
        const pokemonReceived = retrievePokemon(request, response, err, obj);
        const data = {
            pokemon: pokemonReceived
        };
        response.render('pokemon', data)
    });
});


app.get('/pokemon/:id/edit', (request, response) => {

    // retrieve pokemon from specified file.
    const pokemonReceived = retrievePokemon(request, response);

})

app.get('/', (request, response) => {
    data = {
        message: "yay"
    };
    response.render('home', data);
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

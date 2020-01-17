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


/**
 * ===================================
 * Routes
 * ===================================
 */
//new pokemon form page --> !!! CREATE VALIDATION in input
app.get('/pokemon/new', (request, response) => {
    const idFailure = {
        id: false,
        num: false,
        name: false,
        img: false,
        height: false,
        weight: false
    };
    const pokemon = {
        id: "",
        num: "",
        name: "",
        img: "",
        height: "",
        weight: ""
    };
    const data = {
        idFailure: idFailure,
        pokemon: pokemon
    };
    response.render('NewPokemon', data);
});
//

//!!! CREATE JSX TO DISPLAY POKEMON!!!//
app.get('/pokemon/:id', (request, response) => {
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {

        // check to make sure the file was properly read
        if (err) {
            console.log("error with json read file:", err);
            response.status(503).send("error reading file");
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

//!!! CREATE JSX FOR HOME PAGE!!!//
app.get('/', (request, response) => {
    //response.render('home') //this is the home page
    response.send("This is the Pokedex Express App");
});
// add Sort by name button for later


// validate the user's input data. If the user makes a mistake (i.e., the name of the pokemon is empty) render the form instead. Display the error that they made and how they can correct it.
app.post('/pokemon', (request, response) => {
    console.log(request.body);

    jsonfile.readFile(FILE, (err, obj) => {
        let idNum = parseInt(request.body.ID);
        let pokeNum = request.body.Number;
        let pokeName = request.body.name;
        let img = request.body.Image;
        let height = request.body.Height;
        let weight = request.body.Weight;

        //create new object for newly added pokemon
        let newPokemon = {};
        newPokemon.id = idNum;
        newPokemon.num = pokeNum;
        newPokemon.name = pokeName;
        newPokemon.img = img;
        newPokemon.height = height;
        newPokemon.weight = weight;

        //if any of the input fields are empty/invalid, display error and how they can correct it and still render form
        // Stuart - commenting out for now
        let pokemonInputInvalid = false;
        const idFailure = {
            id: false,
            num: false,
            name: false,
            img: false,
            height: false,
            weight: false
        };

        if (newPokemon.id < obj.pokemon.length + 1) {
            pokemonInputInvalid = true;
            idFailure.id = `ID must be greater than ${obj.pokemon.length}`;
            newPokemon.id = request.body.ID;
        }
        if (!newPokemon.id) {
            pokemonInputInvalid = true;
            idFailure.id = `input a valid ID number`;
            newPokemon.id = request.body.ID;
        }
        if (!newPokemon.num) {
            pokemonInputInvalid = true;
            idFailure.num = `input a valid num number.`;
            newPokemon.num = request.body.Number;
        }
        if (!newPokemon.name.trim()) {
            pokemonInputInvalid = true;
            idFailure.name = `input a valid name`;
        }
        if (!newPokemon.img.trim()) {
            pokemonInputInvalid = true;
            idFailure.img = `input a string for an image (it can be anything, just not blank)`;
        }
        if (!newPokemon.height.trim()) {
            pokemonInputInvalid = true;
            idFailure.height = `input something for the weight`;
        }
        if (!newPokemon.weight.trim()) {
            pokemonInputInvalid = true;
            idFailure.weight = `input something for the weight`;
        }

        // do somrthing to check validation.
        // (isNaN(idNum) || request.body.ID.isEmpty()) ? 'Please enter a valid number' : 'OK'

        if (pokemonInputInvalid) {
            const data = {
                idFailure: idFailure,
                pokemon: newPokemon
            }
            response.render(`newpokemon`, data);
            // TODO: render the newpokemon input pages with error messages.
            return;
        }
        //push object into pokemon array in pokedex
        obj.pokemon.push(newPokemon);

        jsonfile.writeFile(FILE, obj, (err) => {
            console.error(err);
            console.log(obj);

            // now look inside your json file
            //render jsx file to go back to home page
            response.send('New Pokemon Added');
        });

    });

});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

const express = require('express');
// Init express app
const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));


// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.get('/', (req, res) => {
  // running this will let express to run home.handlebars file in your views folder
  res.render('home')
})

//---------------------------------------
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

//---------------------------------------

//Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight

app.get('/pokemon/new', (request, response) => {

    let pokeform = '<h1>Pokémon Details</h1>' +
        //Point the form to submit data to the (/pokemon) route using POST method
        '<form method="POST" action="/pokemon">' +
        'id:<input type="text" name="id">' +
        'num:<input type="text" name="num">' +
        'name:<input type="text" name="name">' +
        'img:<input type="text" name="img">' +
        'height:<input type="text" name="height">' +
        'weight:<input type="text" name="weight">' +
        '<input type="submit" value="Submit">' +
        '</form>';

    response.send(pokeform);
});

//Expose a new endpoint that accepts POST requests to /pokemon, which parses the form data and saves the new pokemon data into pokedex.json
app.post('/pokemon', function(request, response) {
    let newPokemon = request.body;

    //read file
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) console.error(err);

        (obj.pokemon).push(newPokemon);

        //write file
        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) console.error(err);
        });
    });
    response.send(newPokemon);
});

//at the root route (GET request) / display a list of all the pokemons in the pokedex
app.get("/", (request, response) => {

    let allPokemonArr = [];

    jsonfile.readFile(FILE, (err, obj) => {
        for (let i = 0; i < obj.pokemon.length; i++) {
            allPokemonArr.push(`<li>${obj.pokemon[i].name}</li>`);
        }

        response.send("All Pokemon:" + allPokemonArr.join("") + ".");
    });
});

//POST part 2
//---------------------------------------
//add the ability to edit the data for a given pokemon

app.get('/pokemon/:id/edit', (request, response) => {

    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {

        let pokemonIndex = parseInt(request.params.id) - 1;
        let selectedPokemon = obj.pokemon[pokemonIndex];

        response.render("home", selectedPokemon)

    });
});

app.put('/pokemon/:id', (request, response) => {
    response.send("YES!");

});



//Listen to requests on port 3000
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
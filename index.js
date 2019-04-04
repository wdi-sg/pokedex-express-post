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

    let pokemonId = parseInt(request.params.id);
    let selectedPokemonIndex;

    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // obj is the object from the pokedex json file
        if (err) console.error(err);

        for (let i = 0; i < obj.pokemon.length; i++) {
            if (pokemonId === obj.pokemon[i].id) {
                selectedPokemonIndex = i;
            }
        };

        let selectedPokemon = obj.pokemon[selectedPokemonIndex];

        response.render("home", selectedPokemon);
    });
});

app.put('/pokemon/:id', (request, response) => {
    //console.log( "this is request body:",request.body );
    let pokemonId = parseInt(request.params.id);
    let pokeIndex;

    jsonfile.readFile(FILE, (err, obj) => {
        if (err) console.error(err);

        for (let i = 0; i < obj.pokemon.length; i++) {
            if (pokemonId === obj.pokemon[i].id) {
                pokeIndex = i;
            }
        }

        let originalPokeName = obj.pokemon[pokeIndex].name;

        // individually edit each value in the animal *object*
        // obj.pokemon[PokeIndex].id = request.body.id;
        obj.pokemon[pokeIndex].num = request.body.num;
        obj.pokemon[pokeIndex].name = request.body.name;
        obj.pokemon[pokeIndex].img = request.body.img;
        obj.pokemon[pokeIndex].height = request.body.height;
        obj.pokemon[pokeIndex].weight = request.body.weight;
        obj.pokemon[pokeIndex].candy = request.body.candy;
        obj.pokemon[pokeIndex].candy_count = request.body.candy_count;
        obj.pokemon[pokeIndex].egg = request.body.egg;
        obj.pokemon[pokeIndex].avg_spawns = request.body.avg_spawns;
        obj.pokemon[pokeIndex].spawn_time = request.body.spawn_time;

        // we dont need to reassign this, but lets be explicit about the change
        const changedObj = obj;

        jsonfile.writeFile(FILE, changedObj, (err) => {
            if (err) console.error(err);

            response.send(`Pokémon ${originalPokeName} was edited.`)
        });
    });
});

//---------------------------------------
// add a new page with a form ( it will be a form with only a single button )
// make the path for this page /pokemon/:id/delete
// submit the form to /pokemon/:id with method DELETE

app.get('/pokemon/:id/delete', (request, response) => {

    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        if (err) console.error(err);

        let pokemonIndex = parseInt(request.params.id) - 1;
        let selectedPokemon = obj.pokemon[pokemonIndex];

        response.render("further1", selectedPokemon)

        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) console.error(err);

            response.send("Pokémon updated");
        });
    });
});

app.delete('/pokemon/:id', (request, response) => {

    let pokeId = parseInt(request.params.id) - 1;
    console.log(request.params.id);

    jsonfile.readFile(FILE, (err, obj) => {
        if (err) console.error(err);
        obj.pokemon.splice(pokeId, 1);

        jsonfile.writeFile(FILE, obj, (err) => {
            if (err) console.error(err);

            response.send("Pokémon deleted");
        });
    });
});

//Listen to requests on port 3000
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
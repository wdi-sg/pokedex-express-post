const express = require('express');
const app = express();
const jsonfile = require('jsonfile');


const FILE = 'pokedex.json';

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

const methodOverride = require('method-override')
app.use(methodOverride('_method'));

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
/**
 * ===================================
 * Routes
 * ===================================
 */


app.put('/pokemon/:id', (request, response) => {
    const file = 'pokedex.json';

    jsonfile.readFile(file, (err, obj) => {
        let requestedPokemonId = request.params.id

        for (let i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].id === parseInt(requestedPokemonId)) {
                var foundPokemonIndex = i;
                var foundPokemon = obj.pokemon[i];
            }
        }
        if (foundPokemon) {
            console.log("FOUND:", foundPokemon);

            obj.pokemon[foundPokemonIndex] = request.body;
            obj.pokemon[foundPokemonIndex].id = parseInt(obj.pokemon[foundPokemonIndex].id)

            jsonfile.writeFile(file, obj, function(err) {
                if (err) console.log("ERROR:", err)

                response.send("Pokemon updated!")
            })
        } else {
            response.send("not a pokemon");
        }
    });

})



app.get('/pokemon/new', (request, response) => {
    response.render('pokemon-new');
});



app.get('/pokemon/:id', (request, response) => {
    const file = 'pokedex.json';

    jsonfile.readFile(file, (err, obj) => {
        console.log("err:", err);

        let requestedPokemonId = request.params.id

        for (let i = 0; i < obj.pokemon.length; i++) {
            if (obj.pokemon[i].id === parseInt(requestedPokemonId)) {
                var foundPokemon = obj.pokemon[i];
            }
        }

        if (foundPokemon) {
            console.log("FOUND:", foundPokemon);
            response.render('pokemon-getid', { pokemon: foundPokemon })
        } else {
            response.send("not a pokemon");
        }

    });
});


app.get('/', (request, response) => {
    const file = 'pokedex.json';

    jsonfile.readFile(file, (err, obj) => {
        console.log("err:", err);

        if (request.query.sortby === 'name') {
            response.render('pokemon-sortname', obj);
        } else if (request.query.sortby === 'id') {
            response.render('pokemon-sortid', obj);
        } else if (request.query.sortby === 'weight') {
            response.render('pokemon-sortweight', obj);
        } else if (request.query.sortby === 'height') {
            response.render('pokemon-sortheight', obj);
        }else {
            response.render('home', obj);
        }
    });
});

app.post('/pokemon', (request, response) => {
    jsonfile.readFile(FILE, function(err, obj) {
        const pokemons = obj.pokemon;
        console.log(pokemons.length);
        var lastKey = pokemons.length;

        let newPoke = {
            id: parseInt(lastKey += 1),
            num: lastKey.toString(),
            name: request.body.name,
            img: request.body.img,
            height: request.body.height,
            weight: request.body.weight,
        };

        obj["pokemon"].push(newPoke);

        jsonfile.writeFile(FILE, obj, function(err) {
            if (err) console.log("ERROR:", err)
            response.send('New Pokemon has been created!');

        });

    });
});

app.get('/pokemon/:id/edit', (request, response) => {
    const file = 'pokedex.json';

    jsonfile.readFile(file, (err, obj) => {
        console.log("err:", err);

        let requestedPokemonId = request.params.id

        for (let i = 0; i < obj.pokemon.length; i++) {

            if (obj.pokemon[i].id === parseInt(requestedPokemonId)) {

                var foundPokemon = obj.pokemon[i];
            }
        }

        if (foundPokemon) {
            console.log("FOUND:", foundPokemon);
            response.render('pokemon-edit', { pokemon: foundPokemon })
        } else {
            response.send("not a pokemon");
        }
    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
const methodOverride = require('method-override')


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

app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */


//creating a form to push stuff into the pokedex
app.get('/pokemon/new', (request, response) => {
    response.render('new');
})


app.get('/pokemon/list' , (request, response) => {

    jsonfile.readFile(FILE, (err, obj) => {
        const pokedex = obj.pokemon;
        const data = {
            pokedex : pokedex
        }
        response.render('list', data)
    });
})

app.get('/pokemon/:id/edit', (request, response) => {
    jsonfile.read(FILE, (err, obj) => {
        if( err ){
            console.log("error with json read file:",err);
            response.status(503).send("error reading filee");
            return;
        }

    })
})



//looking at pokemon from their IDs
app.get('/pokemon/:id', (request, response) => {
    // get json from specified file
    jsonfile.readFile(FILE, (err, obj) => {
        // check to make sure the file was properly read
        if( err ){
            console.log("error with json read file:",err);
            response.status(503).send("error reading filee");
            return;
        }
        // obj is the object from the pokedex json file
        // extract input data from request
        let inputId = parseInt( request.params.id );
        var pokemon;
        // find pokemon by id from the pokedex json file
        for( let i=0; i<obj.pokemon.length; i++ ){
            let currentPokemon = obj.pokemon[i];
            if( currentPokemon.id === inputId ){
                pokemon = currentPokemon;
            }
        }
        if (pokemon === undefined) {
            console.log("why am i happening?")
            // send 404 back
            response.status(404);
            response.send("not found");
        } else {
            let data = {
                id : pokemon.id,
                num : pokemon.num,
                name : pokemon.name,
                img : pokemon.img,
                height: pokemon.height,
                weight: pokemon.weight,
                candy: pokemon.candy,
                candy_count: pokemon.candy_count,
                egg: pokemon.egg,
                avg_spawns: pokemon.avg_spawns,
                spawn_time: pokemon.spawn_time
            }
            response.render('pokemon', data);
        }
    });
});


app.post('/pokemon', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokemon = request.body;
        let pokeData = {
            id: parseInt(pokemon.id),
            num: pokemon.num,
            name: pokemon.name,
            img: pokemon.img,
            height: pokemon.height,
            weight: pokemon.weight,
            candy: pokemon.candy,
            candy_count: pokemon.candy_count,
            egg: pokemon.egg,
            avg_spawns: pokemon.avg_spawns,
            spawn_time: pokemon.spawn_time
        }
        obj.pokemon.push(pokeData);
        jsonfile.writeFile(FILE, obj, (err) => {
            response.send("Pokemon Added to Pokedex")
        })
    })
})

app.put('/pokemon', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        let pokemon = request.body;
        let pokeData = {
            id: parseInt(pokemon.id),
            num: pokemon.num,
            name: pokemon.name,
            img: pokemon.img,
            height: pokemon.height,
            weight: pokemon.weight,
            candy: pokemon.candy,
            candy_count: pokemon.candy_count,
            egg: pokemon.egg,
            avg_spawns: pokemon.avg_spawns,
            spawn_time: pokemon.spawn_time
        }
        obj.pokemon[pokemon.id] = pokeData;
        jsonfile.writeFile(FILE, obj, (err) => {
            response.send("Pokemon Added to Pokedex")
        })
    })
})




app.get('*', (request, response) => {
    response.render("home");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

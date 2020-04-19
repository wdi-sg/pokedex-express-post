const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const pokedex = 'pokedex.json';

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();

app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.get('/pokemon/new', (request, response) => {

    // render a template form here
    response.render('page');
});

app.get('/pokemon/:id', (request, response) => {

    // get json from specified file
    jsonfile.readFile(pokedex, (err, obj) => {

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

app.post('/pokemon', (request, response) => {
    const addNew = (err, obj) => {
        let data = {
            "id": parseInt(request.body.id),
            "num": request.body.num,
            "name": request.body.name,
            "img": request.body.img,
            "height": request.body.height,
            "weight": request.body.weight,
        }
        console.log('************************')
        console.log(data)
        console.log('************************')
        obj.pokemon.push(data)
        response.send(data)

        const doneAdding = (err) => {
            console.log('done editing')
        }
        jsonfile.writeFile(pokedex, obj, doneAdding)
    }
    jsonfile.readFile(pokedex, addNew);
});

app.get('/', (request, response) => {
    response.render('page');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
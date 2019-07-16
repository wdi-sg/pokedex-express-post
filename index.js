const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';

const app = express();

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// Set up method-override for PUT and DELETE forms
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

let pokeArr = [];

app.get('/pokemon/:id', (request, response) => {

    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt(request.params.id);

    var pokemon;
    jsonfile.readFile(file, (err, obj) => {

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

app.get('/pokemon/new', (request, response) => {
    let form = "<html>" +
        "<body>" +
        '<form action="/pokemon" method="POST">' +
        '<input name="id"/>' +
        '<input name="num"/>' +
        '<input name="name"/>' +
        '<input name="img"/>' +
        '<input name="height"/>' +
        '<input name="weight"/>' +
        '<input type="submit"/>' +
        "</form>" +
        "</body>" +
        "</html>";
    response.send(form);
})

app.post("/pokemon", (request, response) => {
    request.body.id = parseInt(request.body.id);
    console.log(request.body);
    obj.pokemon.push(request.body);
    jsonfile.writeFile(file, obj, (err) => {
        console.log(err);
    });
    // store fruit in JSON file
});

app.get("/pokemon/:id/edit", (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let form = '<form method="POST" action="/pokemon/' + request.params.id +
            '?_method=PUT">' +
            '<div class="pokemon-attribute">' +
            'id: <input name="id" type="text" value="' + obj.pokemon[request.params.id - 1].id + '"/>' +
            '<input type="submit"/>' +
            '</div>' +
            '</form>';
        response.send(form);
    });
});

app.put("/pokemon/:id", (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        obj.pokemon[request.params.id - 1].id = parseInt(request.body.id);
        response.send(request.body);
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
    });
});

//query selector proper way
app.get('/', (request, response) => {
    let pokeList = {
        pokeArr: []
    };

    jsonfile.readFile(file, (err, obj) => {

        let form = "<html>" +
            "<body>" +
            '<form action="/" method="GET">' +
            '<select name="sortby">' +
            '<option value = "name">' +
            "Sort pokemon by name" +
            "</option>" +
            '<option value = "id">' +
            "Sort pokemon by id" +
            "</option>" +
            '<option value = "weight">' +
            "Sort pokemon by weight" +
            "</option>" +
            "</select>" +
            "<input type='submit'/>" +
            "</form>" +
            "</body>" +
            "</html>";
        for (let i = 0; i < obj.pokemon.length; i++) {
            pokeList.pokeArr.push(obj.pokemon[i].name);
        }
        if (request.query.sortby === "name") {
            pokeList.pokeArr = pokeList.pokeArr.sort();
        } else if (request.query.sortby === "id") {
            pokeList.pokeArr = pokeList.pokeArr;
        }
    });
    response.render('home', pokeList);

});


/*
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
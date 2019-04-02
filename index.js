//===================================
// Configurations and set up
//===================================
const _ = require('lodash');
const promise = require("bluebird");
const jsonfile = promise.promisifyAll(require('jsonfile'));

const express = require('express');
const app = express();

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

let data;
const file = 'pokedex.json';

//===================================
// Server And Data Loader Function
//===================================
var startServer = function () {
    // read data before starting up server
    jsonfile.readFileAsync(file)
        .then((JSONContent) => {
            data = JSONContent;
        })
        .then(() => {
            app.listen(3000);
        })
        .catch((err) => {
            response.send("Error reading file! Please try again.");
            console.log(err);
        });
}

//===================================
// Helper Function
//===================================
var addZero = function(n) {
  let str = n.toString()

  if (str.length === 1) {
    str = "00" + str;
  } else if (str.length === 2) {
    str = "0" + str;
  }
  return str;
}

// ===================================
// Request Handlers
// ===================================
var homeRequestHandler = function (request, response) {
    if (request.query.sortby !== undefined) {
        let pokemonNames = "";

        if (request.query.sortby === "name") {
            _.sortBy(data.pokemon, ['name']).forEach((o) => {
                pokemonNames += `<li>${ o.id } - ${ o.name }</li>`;
            });
        } else if (request.query.sortby === "id"){
            _.sortBy(data.pokemon, ['id']).forEach((o) => {
                pokemonNames += `<li>${ o.id } - ${ o.name }</li>`;
            });
        }

        response.send(pokemonNames);

    } else {
        let htmlPage = `<form>
                            <select name="sortby">
                                <option value="id">id</option>
                                <option value="name">name</option>
                            </select>
                            <input type="submit" value="Sort Pokemon by Name"/>
                        </form>`;

        response.send(htmlPage);
    }
}

var getPokemonByIdRequestHandler = function (request, response) {
    let pokemon;

    _.forEach(data.pokemon, (o) => {
        if (o.id === Number(request.params.id)) {
            pokemon = o;
        }
    });

    if (pokemon !== undefined) {
        response.send(pokemon);
    } else {
        response.send(404, 'Not found!');
    }
}

var newPokemonRequestHandler = function (request, response) {
    let htmlPage = `<form method="POST" action="/pokemon">
                        <h1>Add New Pokemon</h1>
                        Name: <input name="name"/><br>
                        Image: <input name="img"/><br>
                        Height: <input name="height"/><br>
                        Weight: <input name="weight"/><br><br>
                        <input type="submit" value="Add new Pokemon"/>
                    </form>`;

    response.send(htmlPage);
}

var pokemonRequestHandler = function (request, response) {
    let newPokemon = {};

    newPokemon["id"] = data.pokemon.length + 1;
    newPokemon["num"] = addZero(data.pokemon.length + 1);
    newPokemon["name"] = request.body.name;
    newPokemon["img"] = request.body.img;
    newPokemon["height"] = request.body.height;
    newPokemon["weight"] = request.body.weight;
    newPokemon["candy"] = "None";
    newPokemon["egg"] = "Not in Eggs";
    newPokemon["avg_spawns"] = 0;
    newPokemon["spawn_time"] = "N/A";

    data.pokemon.push(newPokemon);

    jsonfile.writeFileAsync(file, data)
        .then(() => {
            response.send("Added new Pokemon!");
        }).catch((err) => {
            response.send("Error writing file! Please try again.");
            console.log(err);
        });;
}

// ===================================
// Routes
// ===================================
app.get('/', homeRequestHandler);
app.get('/:id', getPokemonByIdRequestHandler);
app.get('/pokemon/new', newPokemonRequestHandler);
app.post('/pokemon', pokemonRequestHandler);

// ===================================
// Start Server
// ===================================
startServer();
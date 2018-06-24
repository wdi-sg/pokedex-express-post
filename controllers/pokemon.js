const helpers = require("../helpers.js");
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

module.exports = {
    showNewPokemonForm: (request, response) => {
        response.render('newpokeform');
    },

    showEditPokemonForm: (request, response) => {
        let context;
        jsonfile.readFile(FILE, (err, objRead) => {
            let matchingPoke = objRead.pokemon.filter( pokemon => String(pokemon.id) === request.params.id);
            if (matchingPoke) {
                context = matchingPoke[0];
                response.render('editpokeform', context);
            } else {
                response.send("No matching pokemon to edit!");
            }
        })
    },

    pokemonCreate: (request, response) => {
        jsonfile.readFile(FILE, (err, objRead) => {
            let pokeId = objRead.pokemon.map( pokemon => pokemon.id)
            let nextPokeId = Math.max.apply(Math, pokeId) + 1;
            let nextPokeNum = helpers.generateNum(nextPokeId);
            let newPokemon = {
                "id": nextPokeId,
                "num": nextPokeNum,
                "name": request.body.name,
                "img": request.body.img,
                "height": request.body.height,
                "weight": request.body.weight,
                "candy": "",
                "candy_count": "",
                "egg": "",
                "avg_spawns": "",
                "spawn_time": ""
            }
            objRead.pokemon.push(newPokemon);
            jsonfile.writeFile(FILE, objRead, function(err) {});
            request.flash('success', 'Pokemon added successfully!');
            response.redirect('/');
        })
    },

    pokemonRead: (request, response) => {
        // get json from specified file
        jsonfile.readFile(FILE, (err, obj) => {
            // obj is the object from the pokedex json file
            // extract input data from request
            let inputId = request.params.id;
            // find pokemon by id from the pokedex json file
            // (note: find() is a built-in method of JavaScript arrays)
            let pokemon = obj.pokemon.find((currentPokemon) => {
                return currentPokemon.id === parseInt(inputId, 10);
            });
            if (pokemon === undefined) {
                // send 404 back
                response.status(404);
                response.send("not found");
            } else {
                response.send(pokemon);
            }
        })
    },

    pokemonUpdate: (request, response) => {
        jsonfile.readFile(FILE, (err, objRead) => {
            if (err) {
                console.log(err);
            } else {
                objRead.pokemon.forEach( pokemon => {
                    if (String(pokemon.id) == request.params.id) {
                        pokemon.name = request.body.name;
                        pokemon.img = request.body.img;
                        pokemon.height = request.body.height;
                        pokemon.weight = request.body.weight;
                    }
                })
                jsonfile.writeFile(FILE, objRead, function(err) {});
                response.redirect('/');
            }
        })
    },

    pokemonDelete: (request, response) => {
        jsonfile.readFile(FILE, (err, objRead) => {
            let pokemonFound = false;
            objRead.pokemon.forEach( (pokemon, index, array) => {
                if (String(pokemon.id) === request.params.id) {
                    array.splice(index, 1);
                    pokemonFound = true;
                }
            })
            if (pokemonFound) {
                jsonfile.writeFile(FILE, objRead, function(err) {});
                request.flash('success', 'Pokemon deleted successfully!');
                response.redirect('/');
            } else {
                request.flash('error', 'Pokemon was not found!');
                response.redirect('/');
            }
        })
    }
}
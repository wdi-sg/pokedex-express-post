const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';
const path = require('path');

module.exports.rootPath = function(req, res) {
  jsonfile.readFile(FILE, (err, obj) => {
    let pokemon = obj.pokemon;
    let arrayOfPokemonNames = [];

    for (let i = 0; i < pokemon.length; i++) {
      arrayOfPokemonNames.push([pokemon[i].name, pokemon[i].id]);
    }

    if (req.query.sortby === 'name') {
      arrayOfPokemonNames.sort();
    }

    res.render('pages/home', { pokemon: arrayOfPokemonNames} )
  })
};

module.exports.newPokemon = function(req, res) {
  res.render('pages/new');
};

module.exports.viewPokemon = function(req, res) {
  jsonfile.readFile(FILE, (err, obj) => {
    let inputId = req.params.id;

    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {
      // send 404 back
      res.status(404);
      res.send("not found");
    } else {
      res.render('pages/edit', { pokemon: pokemon, id: inputId } )
    }
  });
};

module.exports.savePokemon = function(req, res) {

  jsonfile.readFile(FILE, (err, obj) => {
    // get the pokemons array
    let pokemons = obj.pokemon

    // latest id & num will always be POKEMONS.length + 1
    let newNumberAndID = pokemons.length + 1;

    // initialise new object to hold onto new pokemon data
    let newPokemon = {};

    // set the id and number of the newPokemon
    newPokemon['id'] = newNumberAndID;
    newPokemon['num'] = newNumberAndID;

    // handle the form input data
    let formData = req.body;

    // iterate through the keys in form data to add to new pokemon
    for (let keys in formData) {
      newPokemon[keys] = formData[keys];
    };

    pokemons.push(newPokemon);
    const UPDATED_POKEDEX = obj;

    jsonfile.writeFile(FILE, UPDATED_POKEDEX, (err) => {
      res.render('pages/save');
    });
  });
};

module.exports.updatePokemon = function(req, res) {
  jsonfile.readFile(FILE, (err, obj) => {
    // get the pokemons array
    let pokemons = obj.pokemon

    let pokemonArrayPosition = parseInt(req.params['id']) - 1;

    // handle the form input data
    let formData = req.body;

    // iterate through the keys in form data to add to new pokemon
    for (let keys in formData) {
      pokemons[pokemonArrayPosition][keys] = formData[keys];
    };

    const UPDATED_POKEDEX = obj;

    jsonfile.writeFile(FILE, UPDATED_POKEDEX, (err) => {
      res.render('pages/update');
    });
  });
};

// rendering form for delete
module.exports.deletePokemon = function(req, res) {
  jsonfile.readFile(FILE, (err, obj) => {
    let inputId = req.params.id;

    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {
      // send 404 back
      res.status(404);
      res.send("not found");
    } else {
      res.render('pages/delete', { pokemon: pokemon, id: inputId } )
    }
  });
};

// actual delete action
module.exports.confirmDeletePokemon = function(req, res) {
  jsonfile.readFile(FILE, (err, obj) => {
    // get the pokemons array
    let pokemons = obj.pokemon

    let pokemonArrayPosition = parseInt(req.params['id']) - 1;

    // splice out the pokemon
    pokemons.splice(pokemonArrayPosition, 1);

    // get the new updated object
    const UPDATED_POKEDEX = obj;

    jsonfile.writeFile(FILE, UPDATED_POKEDEX, (err) => {
      res.render('pages/after_delete');
    });
  });
};

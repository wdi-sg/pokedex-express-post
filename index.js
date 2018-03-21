const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * Set up the data
 */
let pokemonData = {}, pokemonNames = [], lastKey = 0;

function getNumFromId(key) {
	return ("000" + key).slice(-3);
}

function updateData() {
	jsonfile.readFile(FILE, function (err, obj) {
		// Create an object that stores the pokemon data, with their names as the keys (so that we can easily pull up the relevant data later. We could also easily use the .find() method that's outlined in the commented out section below, or the .filter() method.)
		let tmp = obj.pokemon;
		let tmpname = '';
		tmp.forEach(function(pokemon){
			tmpname = pokemon.name.toLowerCase();
			pokemonData[tmpname] = pokemon; // So for example pokemonData.bulbasaur will give the bulbasaur data.
			// Create an array of all the names of the pokemons (needed for sorting later...)
			pokemonNames.push(tmpname);
			lastKey++;
		});
	})
}

function addNewPokemon(newPokemon) {
	jsonfile.readFile(FILE, function (err, obj) {
		let tmp = obj.pokemon;
		tmp.push(newPokemon);
		let result = {pokemon: tmp};
		jsonfile.writeFile(FILE, result, {spaces: 4}, function(error) {
			return error;
		});
	});
	return true;
}

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

// Hook into body-parser so that we can read the POST request's body info in JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));

/**
 * Handler Functions
 */
function postRootHandler (request, response) {
	let newPokemon = request.body;
	if (pokemonNames.includes(newPokemon.name.toLowerCase())) {
		response.send("Pokemon already exists!");
		return;
	};
	newPokemon.id = ++lastKey;
	newPokemon.num = getNumFromId(lastKey);
	let status = addNewPokemon(newPokemon);
	if (status !== true) {
		console.error(status);
		response.send(status);
	} else {
		response.send(newPokemon);
	};
}

function getRootHandler (request, response) {
	let input = [];
	let parameters = request.params[0].split('/');
	let queryObject = request.query;
	if (parameters != []) {
		input = parameters.map(function(parameter){
			return parameter.toLowerCase();
		});
	}
	switch (input[0]) {
		case 'new':
			// Render the form
			response.render('form');
			break;
		case 'sort':
			// Sort the pokedex and re-render it
			if (queryObject.sortby === 'name') {
				// Sort the pokedex by name
				pokemonNames.sort();
				let tmp = [];
				pokemonNames.forEach(function(e){
					tmp.push(pokemonData[e])
				})
				response.send("Sorted by name");
			} else {
				response.send("Unknown sort criterion");
			};
			break;
		default:
			if (pokemonNames.includes(input[0])) {
				let context = {pokemon: pokemonData[input[0]]}
				response.render('pokemon', context);
			} else {
				response.render('404');
			}
			break;
	}
}

/**
 * ===================================
 * Routes
 * ===================================
 */

//app.get('/new', newPokemonHandler);

/*
app.get('/:id', (request, response) => {
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
			response.render('404');
		} else {
			let context = {
				pokemon: pokemon
			};

			// send html file back with pokemon's data
			response.render('pokemon', context);
		}
	});
});
*/

app.post('/*', postRootHandler);

app.get('/*', getRootHandler);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
updateData();

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
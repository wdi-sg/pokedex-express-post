const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * Set up the data
 */
let pokemonData = {},
	pokemonNames = [],
	pokemonIDs = [],
	lastKey = 0;

function dataInit() {
	pokemonData = {};
	pokemonNames = [];
	pokemonIDs = [];
	lastKey = 0;
}

function getNumFromId(key) {
	return ("000" + key).slice(-3);
}

function refreshData() {
	dataInit();
	jsonfile.readFile(FILE, function (err, obj) {
		// Create an object that stores the pokemon data, with their names as the keys (so that we can easily pull up the relevant data later.
		let tmp = obj.pokemon;
		let tmpname = '', tmpid = 0; // Storing the IDs in another array because of possible holes in the sequence of ID numbers (this wouldn't be a problem with a db system...)
		tmp.forEach(function (pokemon) {
			tmpname = pokemon.name.toLowerCase();
			pokemonData[tmpname] = pokemon; // So for example pokemonData.bulbasaur will give the bulbasaur data.
			// Create an array of all the names of the pokemons (needed for sorting later...)
			pokemonNames.push(tmpname);
			pokemonIDs.push(parseInt(pokemon.id));
			lastKey++;
		});
	});
};

function addNewPokemon(newPokemon) {
	jsonfile.readFile(FILE, function (err, obj) {
		obj.pokemon.push(newPokemon);
		jsonfile.writeFile(FILE, obj, {spaces: 4}, function (error) {
			console.error(error);
		});
	});
	refreshData();
};

function getPokemonById(id) {
	for (let name in pokemonData) {
		if (pokemonData[name]['id'] === id) {
			return pokemonData[name];
		};
	};
};

function getContext(sortByName = false) { // ES6 allows us to specify a default argument
	let result = {};
	result.pokemon = [];
	if (sortByName) {
		//sort by name
		pokemonNames.sort();
		pokemonNames.forEach(function (e) {
			result['pokemon'].push(pokemonData[e]);
		});
	} else {
		// sort by id
		pokemonIDs.sort(function(a,b){return a-b}); // this sort function is needed because the ordinary sort method is a naive type, i.e. 10 will get sorted earlier than 2 because it starts with a 1.
		pokemonIDs.forEach(function(e){
			result['pokemon'].push(getPokemonById(e));
		})
	};
	return result;
};

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
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static('public'));

/**
 * Handler Functions
 */
function postRootHandler(request, response) {
	let newPokemon = request.body; // the form would have given us an object with all the necessary keys and values
	if (pokemonNames.includes(newPokemon.name.toLowerCase())) { // don't create duplicate pokemons
		response.send("Pokemon already exists!");
		return;
	};
	newPokemon.id = ++lastKey; // increment the lastKey value, THEN set the new pokemon's ID to it
	newPokemon.num = getNumFromId(lastKey); // this utility function generates a 3 character string from a digit, i.e. 1 becomes "001"
	addNewPokemon(newPokemon); // this utility function adds a new object to the roster of pokemons in memory, then writes it to disk
	response.send(newPokemon);
}

function getHome(request, response) {
	response.render('home', getContext(false)); // false = sort by id, true = sort by name
};

function getNewForm(request, response) {
	response.render('form');
};

function getPokemonSingleResult(request, response) {
	let input = request.params.id, context = {};
	if (pokemonIDs.includes(parseInt(input))) { // check whether the user input an ID...
		context.pokemon = getPokemonById(parseInt(input)); // utility function to retrieve a pokemon's data given its ID
		response.render('pokemon', context);
	} else if (pokemonNames.includes(input.toLowerCase())) { // or a pokemon name (handle lowercase as well)
		context.pokemon = pokemonData[input.toLowerCase()]; // we stored our pokemon data in an object where the keys are just the pokemon names specifically to be able to do this easily
		response.render('pokemon', context);
	} else {
		response.render('404');
	};
};

function getSortResults(request, response) {
	let queryObject = request.query;
	if (queryObject.sortby === 'name') {
		response.render('home', getContext(true)); // false = sort by id, true = sort by name
	} else if (queryObject.sortby === 'id') {
		response.render('home', getContext(false)); // false = sort by id, true = sort by name
	} else {
		response.send("Unknown sort criterion");
	};
}

/**
 * ===================================
 * Routes
 * ===================================
 */

app.post('/', postRootHandler);

app.get('/new', getNewForm);
app.get('/sort', getSortResults);
app.get('/', getHome);
app.get('/:id', getPokemonSingleResult);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

refreshData();
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
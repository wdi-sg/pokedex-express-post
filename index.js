const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override');

const FILE = 'pokedex.json';

var pokedex;

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/:id', (request, response) => {

	let inputId = request.params.id;

	// find pokemon by id from the pokedex json file
	// (note: find() is a built-in method of JavaScript arrays)
	let pokemon = pokedex.pokemon.find((currentPokemon) => {
		return currentPokemon.id == parseInt(inputId, 10);
	});

	if (pokemon === undefined) {

		// send 404 back
		response.status(404);
		response.send("not found");
	} else {
		response.send(pokemonHtml(pokemon));
	}
});
app.delete('/:id', (request, response) => {
	let inputId = request.params.id;

	let searchFunction = (pokemon) => { 
		return pokemon.id == parseInt(inputId, 10); 
	};
	let idx = pokedex.pokemon.findIndex(searchFunction);
	// The findIndex() method returns the index of the first element in the array that satisfies the provided testing function.
	// Otherwise -1 is returned.
	if (idx === -1) {

		// send 404 back
		response.status(404);
		response.send("not found");
	} else {
		let pokeName = pokedex.pokemon[idx].name;
		pokedex.pokemon.splice(idx, 1);
		saveChanges();
		response.send("bye bye " + pokeName);
	}
});
app.put('/:id', (request, response) => {
	let inputId = request.params.id;
	let inputPoke = request.body;
	// find pokemon by id from the pokedex json file
	// (note: find() is a built-in method of JavaScript arrays)
	let pokemon = pokedex.pokemon.find((currentPokemon) => {
		return currentPokemon.id == parseInt(inputId, 10);
	});

	if (pokemon === undefined) {

		// send 404 back
		response.status(404);
		response.send("pokemon not found");
	} else {
		let pokeKeys = Object.keys(inputPoke);
		for (var i = 0; i < pokeKeys.length; i++) {
			let key = pokeKeys[i];
			pokemon[key] = inputPoke[key];
		}
		saveChanges();
		response.send(("pokemon updated"));
	}
});

app.get('/pokemon/new', (request, response) => {
	response.sendFile(__dirname + '/public/newpokemon.html');
});

app.get('/', (request, response) => {
	let sortField = request.query.sortBy;
	if (sortField == undefined) {
		sortField = 'id';
	}

	var sortFunction = (a, b) => {
		let aVal = a[sortField], bVal = b[sortField];
		if (aVal < bVal) {
			return -1;
		} else if (aVal == bVal) {
			return 0;
		} else {
			return +1;
		}
	};
	pokedex.pokemon.sort( sortFunction );

	response.send(listPokemons());
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

app.post('/pokemon', (request, response) => {
	let newPokemon = request.body;
	let pokemon = pokedex.pokemon.find((currentPokemon) => {
		return currentPokemon.id == parseInt(newPokemon.id, 10);
	});
	if (pokemon === undefined) {
		pokedex.pokemon.push(newPokemon);
		saveChanges();
		response.send("pokemon added");
	} else {
		response.send("pokemon with id " + newPokemon.id + " already exists");
	}
});

var readPokedexCallback = function(err, obj) {
	if (err == undefined) {
		pokedex = obj;
	} else {
		console.error(err);
	}
};

jsonfile.readFile(FILE, readPokedexCallback);

var saveChanges = () => {
	jsonfile.writeFile(FILE, pokedex, { spaces: 2 }, function(err) {
	// call the writeFile function from jsonfile
	// which takes 3 parameters, the first one is the file name of the file to write,
	// the 2nd one is the JS object to write,
	// the 3rd one is an option for nicely formatting the output
	// the 4th one is the callback after the writing is finished
		if (err == undefined) {
			console.log('success');
		} else {
			console.error(err);
		}
	});
};

var listPokemons = () => {
	let htmlString = '<html><body><h1>Welcome to the online Pokedex!</h1>';
	let pokeArr = pokedex.pokemon;
	for (var i = 0; i < pokeArr.length; i++) {
		let poke = pokeArr[i];
		let ul = '<ul>' + '<a href="/' + poke.id + '">' + poke.name + '</a>' + '</ul>';
		htmlString = htmlString + ul;	
	}
	htmlString = htmlString + '</body></html>';
	return htmlString;
};

var pokemonHtml = (pokemon) => {
	let htmlString = '<html><body><h1></h1>';
	htmlString = htmlString + '<form method="POST">';
	let pokeKeys = Object.keys(pokemon); // returns all the keys of each pokemon in an array = ["id", "num","name","img", "height","weight","candy", "candy_count","egg","avg_spawns","spawn_time"]
	for (var i = 1; i < pokeKeys.length; i++) {
		let key = pokeKeys[i];
		htmlString = htmlString + '<label>' + key + '</label>';
		htmlString = htmlString + '<input name="' + key + '" value="' + pokemon[key] + '"><br>';
	}
	htmlString = htmlString + '<input type="submit" formaction="/' + pokemon.id + '?_method=PUT" value="Save Edits" />';
	htmlString += '<input type="submit" formaction="/' + pokemon.id + '?_method=DELETE" value="Delete" />';
	htmlString = htmlString + '</form></body></html>';
	return htmlString;
};









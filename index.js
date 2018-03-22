const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');

const FILE = 'pokedex.json';

let pokemonNames = [];


/**
* ===================================
* Configurations and set up
* ===================================
*/

// Init express app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
// Set handlebars to be the default view engine
app.engine('handlebars', handlebars.create().engine);
app.set('view engine', 'handlebars');

/**
* ===================================
* Routes 
* ===================================
*/

// app.post('/', function(request,response) {
// console.log('entered post');
//   jsonfile.readFile(FILE, function(err, obj) {
//     object.pokemon.push(request.body)
//     console.log(request.body);
//     jsonfile.writeFile('pokedex.json', obj, (err) => {

//       console.error(err);

//       response.send(request.body);
//     });
//   });
// });

// function getSortedName() {
// 	let sorted = [];

// 	jsonfile.readFile(FILE, (err, obj) => {

// 		let pokemonSort = obj.pokemon;
// 		sorted = pokemonSort.sort(sortFunc);

// 		return sorted;
// 	});
// };

app.get('/new', (request, response) => {

	response.render('newform');
});

app.post('/', function (request, response) {
	console.log('entered post');
	jsonfile.readFile(FILE, function (err, obj) {
		obj.pokemon.push(request.body)
		console.log(request.body);
		jsonfile.writeFile('pokedex.json', obj, (err) => {

			console.error(err);

			response.send(request.body);
		});
	});
});

app.get('/', (request, response) => {
	jsonfile.readFile(FILE, (err, obj) => {
		if (request.query.sortby === "name") {
			obj.pokemon = obj.pokemon.sort(sortFunc);
		}
		response.render('home', obj);
	});
});


function sortFunc(a, b) {

	const nameA = a["name"]
	const nameB = b["name"]

	let comparison = 0;
	if (nameA > nameB) {
		comparison = 1;
	} else if (nameA < nameB) {
		comparison = -1;
	}
	return comparison;
}

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


/**
* ===================================
* Listen to requests on port 3000
* ===================================
*/
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

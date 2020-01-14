const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';



/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();


// This code below is needed so that express can deal with json objects
// Particularly too read request.body 
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 Helper functions to aid RESTFUL routing
 * ===================================
 */
function allLetter(word) {
	if (!/[^a-zA-Z]/.test(word)){
		return true
	  } else {
		return false
	  }
}

function checkPokemonLength(obj){
	obj.pokemon.length 
}
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

	// check to make sure the file was properly read
	if (err) {
	  console.log("error with json read file:", err);
	  response.status(503).send("error reading filee");
	  return;
	}

	// Below if-else statement checks if the request.params.id is "new",
	// If it is, render the input form 
	// If not, it should be a number, and the object containing the details of the pokemon should be rendered.
	if (request.params.id == "new") {
		const pokeIndex = obj.pokemon.length
		console.log(pokeIndex)

		const data = {
			idValue: pokeIndex + 1,
			numValue: pokeIndex + 1
		}

	  response.render('form',data);

	} else {

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
	}

  });
});

app.get('/', (request, response) => {
  response.send("yay");
});

app.post('/pokemon', (request, response) => {
	
	jsonfile.readFile(FILE, (err, obj) => {
	
	const pokeIndex = obj.pokemon.length

	let currInput = request.body;

	if (!allLetter(currInput.name) || isNaN(currInput.id) || isNaN(currInput.num) || isNaN(currInput.height) || isNaN(currInput.weight)) {
		
		let reply =  {
			idValue: pokeIndex + 1,
			numValue: pokeIndex + 1,
			idErrorMessage: "",
			numErrorMessage: "",
			heightErrorMessage: "",
			weightErrorMessage: "",
			nameErrorMessage: "",
			imageErrorMessage: ""
		}

		if(!allLetter(currInput.name)){
			reply["nameErrorMessage"] = "Please key in valid name, no numbers and SPACING!"
		}

		if(isNaN(currInput.id)){
			reply["idErrorMessage"] = "Please key in valid id, ONLY numbers!"
		}

		if(isNaN(currInput.num)){
			reply["numErrorMessage"] = "Please key in valid num, ONLY numbers!"
		}

		if(isNaN(currInput.height)){
			reply["heightErrorMessage"] = "Please key in valid height, ONLY numbers!"
		}

		if(isNaN(currInput.weight)){
			reply["weightErrorMessage"] = "Please key in valid weight, ONLY numbers"
		}

		response.render('form',reply);

	} else {
	  
	  currInput["id"] = parseInt(currInput["id"])
	  // Rounding off height to 2.d.p
	  currInput["height"] = Math.round(currInput["height"] * 100) / 100 + " m"
	  // Rounding off weight to 1.d.p 
	  currInput["weight"] = Math.round(currInput["weight"] * 10) / 10 + " kg"
	  // Setting other fields not avaiable in the form as "null"
	  currInput["candy"] = null;
	  currInput["candy_count"] = null;
	  currInput["egg"] = null;
	  currInput["avg_spawn"] = null;
	  currInput["spawn_time"] = null;

	  obj.pokemon.push(currInput)
	  // Check result by looking at last 2 elements in the pokemon array

	  jsonfile.writeFile(FILE, obj, (err) => {
		console.log(err)
		let n = obj.pokemon.length;
		console.log(obj.pokemon.slice(n - 2, n))
		response.send(obj.pokemon.slice(n - 2, n));
	  });
	}



  })
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

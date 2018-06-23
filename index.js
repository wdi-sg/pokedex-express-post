const express = require('express');
const jsonfile = require('jsonfile');

const app = express();
//Allows access to files in public folder
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app


/**
 * ===================================
 * Routes
 * ===================================
 */
 var getPokemonInfo = (request, response) => {

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
  });
};
//create a html page with Form.
var getFormPage = (request, response) => {

	let htmlForm = '<form method="POST" action="/pokemon">' + 
		'<input type="text" name="id" placeholder="id"/>' +
		'<input type="text" name="num" placeholder="num"/>' +
		'<input type="text" name="name" placeholder="name"/>' +
		'<input type="text" name="img" placeholder="img"/>' +
		'<input type="text" name="height" placeholder="height"/>' +
		'<input type="text" name="weight" placeholder="weight"/>' +
		'<input type="submit" value="Create">' +
		'</form>';

	response.send(htmlForm)
};

var createNewPokemon = (request, response) => {
	//reads Json file
	jsonfile.readFile('pokedex.json', (err,obj) => {

		let newPokemon = {
            "id": request.body.id,
            "num": request.body.num,
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
        //adds new object into pokemon's array
		obj.pokemon.push(newPokemon);
		//to make sure var pokemon does not get overwritten
		let newObj = obj;

		//overwrites Json file
		jsonfile.writeFile('pokedex.json', newObj, (err) => {

			response.send('created pokemon! Check pokedex.json');

      });

	})
};

app.get('/:id', getPokemonInfo)
   .get('/pokemon/new', getFormPage)
   .post('/pokemon', createNewPokemon);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

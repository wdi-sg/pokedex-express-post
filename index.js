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
app.use(express.json());
app.use(express.urlencoded ({
  extended: true
}));

/**
 * ===================================
 * Routes
 * ===================================
 */

//Deliverable for part 1 pokedex-express-post. 
//Make a GET request and a corresponding POST request.
app.get('/pokemon/new', (request, response) => {
    let newPokeForm = '<h1>New Pokemon</h1>'+
                            '<form method="POST" action="/pokemon">'+
                            'Choose your Pokemon:' + '<br>' +
                            'Pokemon ID:     <input type="text" name="id">'+ '<br>' +
                            'Pokemon Number: <input type="text" name="num">'+ '<br>' +
                            'Pokemon Name:   <input type="text" name="name">'+ '<br>' +
                            'How does it look like? (put an img link dude): <input type="text" name="img">'+ '<br>' +
                            'Height: <input type="text" name="height">'+ '<br>' +
                            'Weight: <input type="text" name="weight">'+ '<br>' +
                            '<input type="submit" value="Submit">'+ '<br>' +
                            '</form>';
      response.send(newPokeForm);
  });

app.post('/pokemon', (request, response) => {
  console.log(request.body);

  let submitForm = '<div> <h1>Fake PokeDex Display</h1>'+
                    '<div>' + request.body.id + '</div>' +
                    '<div>' + request.body.num + '</div>' +
                    '<div>' + request.body.name + '</div>' +
                    '<div>' + request.body.height + '</div>' +
                    '<div>' + request.body.weight + '</div></div>';
  response.send(submitForm);

  jsonfile.readFile(FILE, (err, obj) => {
    let newPokemon = [];

    newPokemon.id = request.body.id;
    newPokemon.num = request.body.num;
    newPokemon.name = request.body.name;
    newPokemon.img = request.body.img;
    newPokemon.height = request.body.height;
    newPokemon.weight = request.body.weight;

        obj.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, err, (obj) =>{
      if (err !== null) {
        console.log(err);
      }
    });
  });
});

app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
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

app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

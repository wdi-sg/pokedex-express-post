const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override');
const FILE = 'pokedex.json';

const app = express();

// middleware
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'))

// routes
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
      response.status(404);
      response.send("not found");
    } else {

      response.send(pokemon);
    }
  });
});

app.get('/pokemon/new', (request, response) => {
  response.sendFile(__dirname + '/public/form.html');
});

app.get('/pokemon/edit', (request, response) => {
  response.sendFile(__dirname + '/public/editform.html');
});

app.get('/pokemon/delete', (request, response) => {
  response.sendFile(__dirname + '/public/deleteform.html');
});


// ----------------------------------

app.post('/pokemon', (request, response) => {

  console.log('posted stuff')

  let data = request.body;

  // making id a number instead of string
  let id = parseInt(data['id']);
  data['id'] = id;

  // adding the new pokemon data into the list of pokemon
  jsonfile.readFile(FILE, (err, obj) => {

    obj.pokemon.push(data);
    response.send(obj);

    // writes the obj with new data inside
    jsonfile.writeFile(FILE, obj);

  })

});

app.put('/pokemon', (request, response) => {

  console.log('updated stuff');

  // what is the id to edit
  // find the object with that id in the database
  // replace all information in that object

  let editPokemon = request.body;

  // making id a number instead of string
  let id = parseInt(editPokemon['id']);
  editPokemon['id'] = id;

  jsonfile.readFile(FILE, (err, obj) => {

    let pokemon = obj.pokemon;
    
    // finds the pokemon with the matching id
    let pokemonReplace = pokemon.find((currentPokemon) => {
      
      return currentPokemon.id === editPokemon.id
    });

    // replace old object with new object
    let indexToReplace = pokemon.indexOf(pokemonReplace);
    pokemon.splice(indexToReplace, 1, editPokemon);

    response.send(pokemon);
  });
})

app.delete('/pokemon', (request, response) => {

  console.log('deleted stuff');

  // what is the id to delete
  // find the object with that id in the database
  // remove that object

  let deletePokemon = request.body

  // making id a number instead of string
  let id = parseInt(deletePokemon['id']);
  deletePokemon['id'] = id;

  jsonfile.readFile(FILE, (err, obj) => {

    let pokemon = obj.pokemon;

    let pokemonRemove = pokemon.find((currentPokemon) => {

      return currentPokemon.id === deletePokemon.id
    });

    if (pokemonRemove == undefined) {
      response.send('cannot remove anything');

    } else {
      let indexToRemove = pokemon.indexOf(pokemonRemove);
      pokemon.splice(indexToRemove, 1);
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

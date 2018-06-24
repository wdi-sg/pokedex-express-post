const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override');
const FILE = 'pokedex.json';

const app = express();

// middleware
// app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// routes

app.get('/pokemon/new', (request, response) => {
  response.sendFile(__dirname + '/public/form.html');
});

app.get('/pokemon/edit', (request, response) => {
  response.sendFile(__dirname + '/public/editform.html');
});

app.get('/pokemon/delete', (request, response) => {
  response.sendFile(__dirname + '/public/deleteform.html');
});

app.get('/pokemon', (request, response) => {

  jsonfile.readFile(FILE, (err, obj) => {

    let pokemons = obj.pokemon;
  
    if (request.query.sortby == "name") {

      pokemons.sort( (a, b) => {
        if (a.name < b.name)
          return -1;
        if (b.name < a.name)
          return 1;
        return 0;
      });
      response.send(obj);

    } else {
      response.send(obj)
    }

  })
});

//2nd attempt -------------------------------
app.get('/:id/edit', (request, response) => {

  let pokemonToEditId = request.params['id']; 

  let html = '<h1>Edit Pokemon</h1>\
  <form method="POST" action="/' + pokemonToEditId +'/edit?_method=PUT">\
    Number: <input type="text" name="num"><br>\
    Name: <input type="text" name="name"><br>\
    Image: <input type="text" name="img"><br>\
    Height: <input type="text" name="height"><br>\
    Weight: <input type="text" name="weight"><br>\
    <input type="submit" name="Confirm Edit"><br>\
  </form>'
  response.send(html)
});

app.get('/:id/delete', (request, response) => {

  let pokemonToEditId = request.params['id']; 

  let html = '<h1>Delete Pokemon</h1>\
  <form method="POST" action="/' + pokemonToEditId +'/delete?_method=DELETE">\
    Press "Confirm" to delete Pokemon ID: ' + pokemonToEditId + 
    '<br><br><input type="submit" value="Confirm"> \
  </form>'
  response.send(html)
});



//-------------------------------------------
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

app.get('/', (request, response) => {
  let html = 
  '<form method="GET" action="/pokemon">\
    <h1>Hi! Welcome to the online Pokèdex</h1>\
    <input type="submit" value="Sort By Name">\
    <input type="hidden" name="sortby" value="name">\
  </form>'
  // ask!! is input type=hidden etc, the right way...? Cannot add another input type, as it would append the query
  response.send(html);
});

// ============================================================================================================================================================================================================================================

// add new pokemon
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

// edit pokemon, input existing ID to edit
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

    let pokemons = obj.pokemon;
    
    // finds the pokemon with the matching id
    let pokemonReplace = pokemons.find((currentPokemon) => {
      return currentPokemon.id === editPokemon.id
    });

    // if id not found, request.body will be appended to the end of the array
    // alternatively, I could add an if pokemonReplace === undefined condition to check for
    // the validity of pokemonReplace.
    // Case: if pokemonReplace === undefined, request.send(no pokemon, you should add pokemon instead)

    // replace old object with new object
    let indexToReplace = pokemons.indexOf(pokemonReplace);
    pokemons.splice(indexToReplace, 1, editPokemon);

    response.send(pokemons);
  });
});

// delete pokemon, input existing ID to delete
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

    let pokemons = obj.pokemon;

    let pokemonRemove = pokemons.find((currentPokemon) => {
      return currentPokemon.id === deletePokemon.id
    });

    if (pokemonRemove == undefined) {
      response.send('ID not found');

    } else {
      let indexToRemove = pokemons.indexOf(pokemonRemove);
      pokemons.splice(indexToRemove, 1);
      response.send(pokemons);

    }

  });
});

//2nd attempt -------------------------------
// update pokemon, does not remove id, checks for invalid id
app.put('/:id/edit', (request, response) => {

  let pokemonId = parseInt(request.params['id']);
  let index = pokemonId - 1;

  let updatedPokemon = request.body

  jsonfile.readFile(FILE, (err, obj) => {
    let pokemons = obj.pokemon;
    let pokemon = pokemons[index]

    if (pokemon === undefined) {
      response.send('There are no Pokemons with an ID of ' + pokemonId + '. Add Pokemon instead.');
      return;
    };

    // updating the values; individually
    // pokemon.num = updatedPokemon.num;
    // pokemon.name = updatedPokemon.name;
    // pokemon.img = updatedPokemon.img;
    // pokemon.height = updatedPokemon.height;
    // pokemon.weight = updatedPokemon.weight;

    // updating the values; using for loop
    for (var key in updatedPokemon) {
      // checks for empty input. If empty input then don't change anything
      updatedPokemon[key] === "" ? updatedPokemon[key] = pokemon[key] : pokemon[key] = updatedPokemon[key];
    };

    response.send(pokemon);
  });
});

app.delete('/:id/delete', (request, response) => {
 
  let pokemonId = parseInt(request.params['id']);
  let index =  pokemonId - 1;

  jsonfile.readFile(FILE, (err, obj) => {
    let pokemons = obj.pokemon;
    let pokemon = pokemons[index]

    if (pokemon === undefined) {
      response.send('There are no Pokemons with an ID of ' + pokemonId + '.');
      return;
    };

    pokemons.splice(index, 1);

    response.send(pokemons);
  });
});


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

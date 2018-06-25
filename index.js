const express = require('express');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const FILE = 'pokedex.json';

// Init express app
const app = express();

//Use public folder for publicly availble static files.
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))


app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;
    // find pokemon by id from the pokedex json files
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
  response.send("Welcome to the Pokedex!");
});

//Intercept /pokemon/new with a form
app.get('/pokemon/new', (request, response) => {
  let htmlForm = '<header><h1>Add New Pokemon</h1></header><br>' +
              '<form method="POST" action="/pokemon"><br>' +  
              '<input type="text" name="id" placeholder="id"/><br>' +
              '<input type="text" name="num" placeholder="num"/><br>' +
              '<input type="text" name="name" placeholder="name"/><br>' +
              '<input type="text" name="img" placeholder="img"/><br>' +
              '<input type="text" name="height" placeholder="height"/><br>' +
              '<input type="text" name="weight" placeholder="weight"/><br>' +
              '<input type="submit" value="Create">' +
              '</form>'
  response.send(htmlForm);
});


app.post('/pokemon', (request, response) => {
  let newPokemon = {
    "id": request.body.id,
    "num": request.body.num,
    "name": request.body.name,
    "img": request.body.img,
    "height": request.body.height,
    "weight": request.body.weight,
  }
    response.send("New Pokemon Created!");
  });

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
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

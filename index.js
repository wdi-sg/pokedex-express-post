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
  jsonfile.readFile(FILE, (err, obj) => {
    let inputId = request.params.id;
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });
    if (pokemon === undefined) {
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
  response.sendFile(__dirname + '/public/form.html');
});

//Adding new Pokemon
// app.post('/pokemon', (request, response) => {
//   let newPokemon = {
//     "id": request.body.id,
//     "num": request.body.num,
//     "name": request.body.name,
//     "img": request.body.img,
//     "height": request.body.height,
//     "weight": request.body.weight,
//   }
//     response.send("New Pokemon Created!");
//   });

// add new pokemon
app.post('/pokemon', (request, response) => {
  console.log('Created New Pokemon')
  let data = request.body;
  let id = parseInt(data['id']);
  data['id'] = id;
  jsonfile.readFile(FILE, (err, obj) => {
    obj.pokemon.push(data);
    console.log(data);
    response.send(obj);
    jsonfile.writeFile(FILE, obj);
  })
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

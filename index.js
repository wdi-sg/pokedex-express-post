const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override');
var path = require('path');

const FILE = 'pokedex.json';

// Init express app
const app = new express();

// Middleware
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// app.use(methodOverride('_method'));

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
  response.send("yay");
});

db = [];

app.get('/pokemon/new', (req, res) => {
  res.sendfile('./public/pokemonNew.html');

  let id = req.query['id'];
  let num = req.query['num'];
  let name = req.query['name'];
  let img = req.query['img'];
  let height = req.query['height'];
  let weight = req.query['weight'];
  
  db = {"id" : id, "num" : num, "name" : name, "img" : img, "height" : height, "weight" : weight}

});

app.post('/pokemon/new', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) =>{
    
    let pokemonNew = {
      "id" : req.body.id,
      "num" : req.body.num,
      "name" : req.body.name,
      "img" : req.body.img,
      "height" : req.body.height,
      "weight" : req.body.weight,
    };

    obj.push(pokemonNew);
    jsonfile.writeFile(FILE, obj, (err) => {

    })
  })
  res.send('Completed');
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

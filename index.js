// Load modules and set up
const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

// Init express app
const app = express();

// Functions
const getPokemon = function (req, res) {
  let pokemon;
  let inputId = Number(req.params.id);
  let filePromise = jsonfile.readFile(FILE);

  filePromise
    .then(obj => {
      for(let mon of obj.pokemon){
        if(mon.id === inputId ){
          pokemon = mon;
        }
      }
    if (pokemon === undefined) {
      // send 404 back
      res.status(404);
      res.send("not found");
    } else {
      res.send(pokemon);
    }
  });
};

// Routes

app.get('/pokemon/:id', getPokemon);

app.get('/', (request, response) => {
  response.send("yay");
});

// Listen on 3000
app.listen(3000, () => console.log('~~~ Tuning to port 3000 ~~~'));

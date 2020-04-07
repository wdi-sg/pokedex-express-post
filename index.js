// Load modules and set up
const express = require('express');
const jsonfile = require('jsonfile');
const FILE = 'pokedex.json';

// Init express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

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

const sendForm = function (req, res) {
  //id, num, name, img, height, and weight
};

const addPokemon = function (req, res) {
};

// Routes

app.get('/pokemon/new', sendForm);

app.get('/pokemon/:id', getPokemon);

app.post('/pokemon', addPokemon);

// this could handle query strings if we have time
app.get('/', (req, res) => {
  if (req.query.sortBy) {
    res.send("got a sort request here!");
  }
  res.send("yay");
});

// Listen on 3000
app.listen(3000, () => console.log('~~~ Tuning to port 3000 ~~~'));

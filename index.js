const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const generateForm = () => {
  let form = '<html>';
  form += '<head>';
  form += '<title>Pokemon</title>';
  form += '</head>';
  form += '<body>';
  form += '<form method="POST" action="/pokemon">';
  form += '<label for="id">id</label> <input type="number" name="id"><br>';
  form += '<label for="num">num</label> <input type="number" name="num"><br>';
  form += '<label for="name">name</label> <input type="text" name="name"><br>';
  form += '<label for="img">img</label> <input type="url" name="img"><br>';
  form += '<label for="height">height</label> <input type="text" name="height"><br>';
  form += '<label for="weight">weight</label> <input type="text" name="weight"><br>';
  form += '<input type="submit" value="Submit">';
  form += '</form>';
  form += '</body>';
  form += '</html>';
  return form;
};

app.get('/pokemon/new', (request, response) => {
  response.send(generateForm());
});

app.get('/:id', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let inputId = parseInt(request.params.id);
    let pokemon;

    for (let i = 0; i < obj.pokemon.length; i++) {
      let currentPokemon = obj.pokemon[i];
      if (currentPokemon.id === inputId) {
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {
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

app.post('/pokemon', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      response.status(404).send(err);
    }

    let newPokemon = {};
    newPokemon.id = request.body.id;
    newPokemon.num = request.body.num;
    newPokemon.name = request.body.name;
    newPokemon.img = request.body.img;
    newPokemon.height = request.body.height;
    newPokemon.weight = request.body.weight;

    obj.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, obj, err => {
      if (err) {
        response.status(404).send(err);
      }
      response.send('New pokemon saved!');
    });
  });
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

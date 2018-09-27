const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override');
const reactEngine = require('express-react-views').createEngine();

const FILE = 'pokedex.json';
const app = express();
app.engine('jsx', reactEngine);
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const generateHtml = (content) => {
  let html = '<html>';
  html += '<head>';
  html += '<title>Pokemon</title>';
  html += '<style>* {padding: 0; margin: 0; box-sizing: border-box;} body {padding: 2rem;} a {text-decoration: none; padding: 1rem 2rem; border: 1px solid black;}</style>';
  html += '</head>';
  html += '<body>';
  html += content;
  html += '</body>';
  html += '</html>';
  return html;
};

const generateForm = () => {
  let form = '<form method="POST" action="/pokemon">';
  form += '<label for="id">id</label> <input type="number" name="id"><br>';
  form += '<label for="num">num</label> <input type="number" name="num"><br>';
  form += '<label for="name">name</label> <input type="text" name="name"><br>';
  form += '<label for="img">img</label> <input type="url" name="img"><br>';
  form += '<label for="height">height</label> <input type="number" name="height"> m<br>';
  form += '<label for="weight">weight</label> <input type="number" name="weight"> kg<br>';
  form += '<input type="submit" value="Submit">';
  form += '</form>';
  return form;
};

app.get('/pokemon/new', (request, response) => {
  response.send(generateHtml(generateForm()));
});

app.get('/pokemon/:id/edit', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      console.log(err);
      return;
    }

    const foundPokemon = obj.pokemon.filter(pokemon => {
      return pokemon.id === parseInt(req.params.id);
    });

    if (foundPokemon.length > 0) {
      res.render('PokemonEdit', foundPokemon[0]);
    } else {
      res.send('Not a pokemon!');
    }
  });
});

app.get('/pokemon/:id', (request, response) => {
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

// /pokemon?sortby=name
app.get('/pokemon', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      response.status(404).send(err);
    }

    const sortBy = request.query.sortby.toLowerCase();
    if (sortBy === 'name') {
      obj.pokemon.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    } else {
      obj.pokemon.sort((a, b) => parseFloat(a[sortBy]).toFixed(2) -
        parseFloat(b[sortBy]).toFixed(2));
    }
    response.send(obj.pokemon);
  });
});

app.get('/', (request, response) => {
  let content = '<form action="/pokemon">';
  content += '<select name="sortby">';
  content += '<option disabled selected value>Sort by...</option>';
  content += '<option value="id">id</option>';
  content += '<option value="name">name</option>';
  content += '<option value="height">height</option>';
  content += '<option value="weight">weight</option>';
  content += '</select>'
  content += '<input type="submit"/>';
  content += '</form>';
  response.send(generateHtml(content));
});

app.post('/pokemon', (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      response.status(404).send(err);
    }

    let newPokemon = request.body;
    newPokemon.id = parseInt(newPokemon.id);
    newPokemon.height = newPokemon.height + ' m';
    newPokemon.weight = newPokemon.weight + ' kg';

    if (newPokemon.id <= obj.pokemon.length) {
      response.send('Please enter an ID that is greater than ' + obj.pokemon.length);
      return;
    }

    obj.pokemon.push(newPokemon);
    jsonfile.writeFile(FILE, obj, err => {
      if (err) {
        response.status(404).send(err);
      }

      response.send(newPokemon);
    });
  });
});

app.put('/pokemon/:id', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      console.log(err);
      return;
    }

    var foundIndex = obj.pokemon.findIndex(pokemon => {
      return pokemon.id === parseInt(req.params.id);
    });

    if (foundIndex !== -1) {
      obj.pokemon[foundIndex] = req.body;
      obj.pokemon[foundIndex].id = parseInt(req.body.id);
      obj.pokemon[foundIndex].height = req.body.height + ' m';
      obj.pokemon[foundIndex].weight = req.body.weight + ' kg';

      jsonfile.writeFile(FILE, obj, err => {
        if (err) {
          console.log(err);
          return;
        }

        res.send('Pokemon updated!');
      });
    } else {
      res.send('Not a pokemon!');
    }
  });
});

app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

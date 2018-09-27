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

app.get('/pokemon/new', (req, res) => {
  res.render('PokemonNew');
});

app.get('/pokemon/:id/edit', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      console.log(err);
      return;
    }

    const foundPokemon = obj.pokemon.find(pokemon => {
      return pokemon.id === parseInt(req.params.id);
    });

    if (foundPokemon) {
      res.render('PokemonEdit', foundPokemon);
    } else {
      res.status(404).send('Not a pokemon!');
    }
  });
});

app.get('/pokemon/:id', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    let inputId = parseInt(req.params.id);
    const foundPokemon = obj.pokemon.find(pokemon => {
      return pokemon.id === inputId;
    });

    if (foundPokemon) {
      res.render('PokemonDetail', foundPokemon);
    } else {
      res.render('Error', { message: 'Not found!' });
    }
  });
});

// /pokemon?sortby=name
app.get('/pokemon', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      res.status(404).send(err);
    }

    const sortBy = req.query.sortby.toLowerCase();
    if (sortBy === 'name') {
      obj.pokemon.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    } else {
      obj.pokemon.sort((a, b) => parseFloat(a[sortBy]).toFixed(2) -
        parseFloat(b[sortBy]).toFixed(2));
    }

    res.render('PokemonList', { pokemons: obj.pokemon, sortBy: sortBy });
  });
});

app.get('/', (req, res) => {
  res.render('Home');
});

app.post('/pokemon', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      res.status(404).send(err);
    }

    let newPokemon = req.body;
    newPokemon.id = parseInt(newPokemon.id);
    newPokemon.num = '' + req.body.id;
    newPokemon.height = parseFloat(newPokemon.height).toFixed(2) + ' m';
    newPokemon.weight = parseFloat(newPokemon.weight).toFixed(1) + ' kg';

    const foundPokemon = obj.pokemon.find(pokemon => {
      return pokemon.id === newPokemon.id;
    });

    if (foundPokemon || newPokemon.id < 1) {
      const message = 'Invalid ID. Please try another one.';
      res.render('Error', { message: message });
      return;
    }

    obj.pokemon.push(newPokemon);
    jsonfile.writeFile(FILE, obj, err => {
      if (err) {
        console.log(err);
        return;
      }

      res.redirect('/pokemon/' + newPokemon.id);
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
      obj.pokemon[foundIndex].name = req.body.name;
      obj.pokemon[foundIndex].img = req.body.img;
      obj.pokemon[foundIndex].height = parseFloat(req.body.height).toFixed(2) + ' m';
      obj.pokemon[foundIndex].weight = parseFloat(req.body.weight).toFixed(1) + ' kg';

      jsonfile.writeFile(FILE, obj, err => {
        if (err) {
          console.log(err);
          return;
        }

        res.redirect('/pokemon/' + req.params.id);
      });
    } else {
      const message = 'Not a pokemon!';
      res.render('Error', { message: message });
    }
  });
});

app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

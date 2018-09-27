const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

const reactEngine = require('express-react-views').createEngine();

app.engine('jsx', reactEngine);
app.set('views', `${__dirname}/views`);
app.set('view engine', 'jsx');

// POKEMON DISPLAY
app.get('/pokemon', (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    const pokedex = obj.pokemon;
    Object.keys(pokedex).forEach((key) => {
      if (req.query.id === pokedex[key].id.toString()) return res.render('display-pokemon', { p: pokedex[key] });
    });
  });
});

// HOME PAGE
app.get('/', (req, res) => {
  const query = Object.keys(req.query)[0];
  const param = req.query[query];
  jsonfile.readFile(FILE, (err, obj) => {
    if (query) {
      console.log(param);
      if (param === 'name') {
        obj.pokemon.sort((a, b) => a[param].localeCompare(b[param]));
      } else obj.pokemon.sort((a, b) => parseFloat(a[param]) - parseFloat(b[param]));
      return res.render('list-pokemon', { object: obj });
    }

    if (req.params[0] === undefined) return res.render('index', { object: obj });
    return res.send('Wrong part of town');
  });
});

app.listen(PORT);

const express = require('express');
const jsonfile = require('jsonfile');
const bodyParser = require('body-parser');
const path = require('path');
const port = 3000;
const FILE = 'pokedex.json';

const reactViews = require('express-react-views');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.engine('jsx', reactViews.createEngine());
app.set('view engine', 'jsx');
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => console.log(`~~~ Tuning in to the waves of port ${port} ~~~`));


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/new', (req, res) => {
  res.render('form');
});
app.use('/pokemon', preventDuplicate);
app.post('/pokemon', addPokemon);
app.get('/pokemon/:id', viewPokemonById);
app.get('/', (request, response) => {
  response.send("yay");
});

// utils
const getJson = async () => await jsonfile.readFile(FILE);
const writeJson = async (data) => await jsonfile.writeFile(FILE, data);

// controllers
function preventDuplicate(req, res, next ) {
  getJson()
      .then(data => checkDuplicates(data, req))
      .then( hasDup =>handleIfDuplicates (hasDup,next,res));
}

function checkDuplicates(data, req) {
  return data.pokemon.some(item =>
    item.name === req.body.name ||
    item.id === req.body.id ||
    item.num === req.body.num)
}

function handleIfDuplicates(hasDuplicate,next,res) {
  if(hasDuplicate) {
    res.render("There is already an pokemon with id, name , or number");
  } else {
    next();
  }
}

function getInvalidInputFields(id, num, name, img, height, weight ) {
  const errors = {};
  const params = {id, num, name, img, height, weight};
  for (const key in params) {
    if (!params[key]) {
      errors[key] = `${key} is missing`
    }
  }
  return errors
}

function addPokemon(req, res) {
  const {id, num, name, img, height, weight} = req.body;
  const errors = getInvalidInputFields();
  if (errors.length) {
    console.log(errors);
    return res.render('form', errors);
  }
  else {
    getJson()
      .then(data =>_addPokemon(data, id, num, name, img, height, weight))
      .then(writeJson)
  }

}

function _addPokemon(data, id, num, name, img, height, weight) {
  data.pokemon.push({id, num, name, img, height, weight});
  return data;
}


function viewPokemonById(response, request) {
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      console.log("error with json read file:", err);
      response.status(503).send("error reading filee");
      return;
    }
    let inputId = parseInt(request.params.id);
    var pokemon;

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
}
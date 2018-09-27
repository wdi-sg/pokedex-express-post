const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

const app = express();

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}))

// stops requests from returning favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:id', (request, response) => {

  let searchId = request.params.id;

  jsonfile.readFile(FILE, (err, obj) => {

    response.render('id', {search: searchId, pokedex: obj.pokemon});
  })
})

app.get('/pokemon/new', (request, response) => {

  response.render('new');

})

app.post('/pokemon', (request, response) => {

  jsonfile.readFile(FILE, (err, obj) => {

    let newPokemon = {};
    let pokedex = obj;

    newPokemon["id"] = parseInt(obj.pokemon.length + 1);
    newPokemon["num"] = obj.pokemon.length + 1;
    newPokemon["name"] = request.body.name;
    newPokemon["img"] = request.body.img;
    newPokemon["height"] = request.body.height;
    newPokemon["weight"] = request.body.weight;

    pokedex.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, pokedex, (err) => {
      if (err) console.log(err);

      response.redirect("/?sortby=id");
    })
  })
})

app.get('/', (request, response) => {

  let sortBy = request.query.sortby;

  jsonfile.readFile(FILE, (err, obj) => {
    if (err) console.log(err);

    response.render('pokedex', {sorted: sortBy, pokedex: obj.pokemon});
  })
})

const PORT = 3000;
app.listen(PORT, () => console.log("Listening on port: " + PORT));

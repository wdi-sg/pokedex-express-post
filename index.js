const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

const app = express();

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}))

// stops requests from returning favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/:id/edit', (request, response) => {

  let id = request.params.id;

  jsonfile.readFile(FILE, (err, obj) => {
    if (err) console.log(err);

    response.render('edit', {id: id, pokedex: obj.pokemon});
  })
})

app.put('/:id', (request, response) => {

  jsonfile.readFile(FILE, (err, obj) => {

    let id = parseInt(request.body.id);
    let pokedex = obj;
    let index;

    for (let i in pokedex.pokemon) {
      if (pokedex.pokemon[i].id === id) {
        index = i;
      }
    }

    if (index) {

      pokedex.pokemon[index].name = request.body.name;
      pokedex.pokemon[index].img = request.body.img;
      pokedex.pokemon[index].height = request.body.height;
      pokedex.pokemon[index].weight = request.body.weight;

      // further 2
      if (pokedex.pokemon[index].name.length < 3 ) {
        response.send("Name too short!");
      } else {

        jsonfile.writeFile(FILE, pokedex, (err) => {
          if (err) console.log(err);

          response.redirect("/");
        })
      }
    } else {
      response.send("Invalid edit request!");
    }
  })
})

//last further
app.post('/:id', (request, response) => {

  let id = parseInt(request.params.id);
  let typeOne = request.body.typeOne;
  let typeTwo = request.body.typeTwo;

  jsonfile.readFile(FILE, (err, obj) => {

    let pokedex = obj;
    let index;

    for (let i in pokedex.pokemon) {
      if (pokedex.pokemon[i].id === id) {
        index = i;
      }
    }

    if (typeOne || typeTwo) {
      pokedex.pokemon[index]["type"] = [];

      if (typeOne) {
        pokedex.pokemon[index].type.push(typeOne);
      }

      if (typeTwo && typeTwo !== typeOne) {
        pokedex.pokemon[index].type.push(typeTwo);
      }

      jsonfile.writeFile(FILE, pokedex, (err) => {
        if (err) console.log(err);

        response.redirect("/" + id);
      })

    } else {
      response.send("No type selected!");
    }
  })
})

app.get('/:id', (request, response) => {

  let searchId = request.params.id;

  jsonfile.readFile(FILE, (err, obj) => {
    if (err) console.log(err);

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

      response.redirect("/");
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

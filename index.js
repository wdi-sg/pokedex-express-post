const express = require('express');
const jsonfile = require('jsonfile');
const handlebars = require('express-handlebars');

const FILE = 'pokedex.json';


// Init express app
const app = express();
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', handlebars({extname: 'handlebars', defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');
/**
 * ===================================
 * Routes
 * ===================================
 */


app.get('/pokemon/new', (req, res) => {
  res.render('form');
});

app.post('/pokemon', (req, res) => {

  jsonfile.readFile(FILE, (err, obj) => {
    let pokemon = obj;
    let pokemonObj = obj.pokemon;

    let newPokemon = {};
    newPokemon["id"] = req.body.id;
    newPokemon["num"] = req.body.num;
    newPokemon["name"] = req.body.name;
    newPokemon["image"] = req.body.img;
    newPokemon["height"] = req.body.height + ' m';
    newPokemon["weight"] = req.body.weight + ' kg';

    let liPokemon = ''
    for (key in newPokemon) {
      liPokemon += (`<li>${key}: ${newPokemon[key]}</li>`);
    }
    
    pokemonObj.push(newPokemon);

    jsonfile.writeFile(FILE, obj, function (err) {
    console.error(err)
    });

    res.render('post',{
      dataHere: liPokemon
    });
  });  
});

app.get('/:id', (req, res) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = req.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {

      // send 404 back
      res.status(404);
      res.send("404, NOT FOUND");
    } else {

      res.send(pokemon);
    }
  });
});

app.get('/', (req, res) => {

  jsonfile.readFile(FILE, (err, obj) => {
    let pokemonObj = obj.pokemon;
    let allPokemon = '';
    for (var i = 0; i < pokemonObj.length; i++) {
      allPokemon += `<li>${pokemonObj[i].name}</li>`;
    }

    res.render('home',{
        number: pokemonObj.length,
        pokemon: allPokemon
    });
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

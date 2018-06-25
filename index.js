const express = require('express');
const jsonfile = require('jsonfile');
const methodOverride = require('method-override');
const FILE = 'pokedex.json';
const path = require('path'); 

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

let pokemonObj;

app.get('/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = request.params.id;
    pokemonObj = obj.pokemon;
    // console.log(pokemonObj);
    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find((currentPokemon) => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found");
    } else {
      response.send(pokemon);
    }
  });
});

app.get('/', (request, response) => {
  response.send("POKEDEX Page");
});

app.get('/pokemon/new', (request, response) =>{
  response.sendFile('index.html', {root: path.join(__dirname, './public')})
});


app.post('/pokemon', createPokemonData);

function createPokemonData(request, response) {

  jsonfile.readFile('pokedex.json', (err, obj) => {
    //pokemonArray = obj.pokemon;
    console.log("hello",obj.pokemon);
    let newPokeData = request.body;
    //pokemonArray.push(newPokeData);

    obj.pokemon.push(newPokeData);

  // console.log(pokemonObj)
  // console.log(request.body)

    jsonfile.writeFile('pokedex.json', obj, (err) => {
      console.error(err)

    });
  
  });
  

    // now look inside your json file
    response.send('pokemon saved');

  //let postHtml = '<form method="POST" action="/pokemon'+ newInput + '"><input type="text" name="' + newInput + '"><input type="submit" value="Submit"></form>';
  //let createdPokeData = request.params['pokemon'];
  //let value = request.body[createdPokeData];
  //pokemonObj[createdPokeData] = value;
}

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
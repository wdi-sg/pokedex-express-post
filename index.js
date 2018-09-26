const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}))

app.get('/:id', (request, response) => {

  jsonfile.readFile(FILE, (err, obj) => {

  })
})


app.get('/pokemon/new', (request, response) => {

  let html = "";
  html += "<html><body>";
  html += `<form method="POST" action="/pokemon">`;
  html += "<h1>Make a new Pokemon:</h1>";
  html += `ID: <input type="text" name="id"><br>`;
  html += `No: <input type="text" name="num"><br>`;
  html += `Name: <input type="text" name="name"><br>`;
  html += `Image: <input type="text" name="img"><br>`;
  html += `Height: <input type="text" name="height"><br>`;
  html += `Weight: <input type="text" name="weight"><br>`;
  html += '<input type="submit" value="Submit"><br>';
  html += "</form>";
  html += "</body></html>";

  response.send(html);
})

app.post('/pokemon', (request, response) => {

  let newPokemon = {};
  newPokemon["data"] = request.body;
  newPokemon["id"] = request.body.id;
  newPokemon["num"] = request.body.num;
  newPokemon["name"] = request.body.name;
  newPokemon["img"] = request.body.img;
  newPokemon["height"] = request.body.height;
  newPokemon["weight"] = request.body.weight;

  jsonfile.readFile(FILE, (err, obj) => {

    let pokedex = obj;

    pokedex.pokemon.push(newPokemon);

    jsonfile.writeFile(FILE, pokedex, (err) => {
      if (err) console.log(err);

      response.send(pokedex.pokemon);
    })
  })
})

app.get('/', (request, response) => {
  response.send("This is where the Pokedex should be.");
})



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

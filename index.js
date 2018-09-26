
const express = require('express');
const jsonfile = require('jsonfile');

const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

//let app use module
app.use(express.json());
 app.use(express.urlencoded({
   extended: true
 }));
/**
 * ===================================
 * Routes
 * ===================================
 */

const pokemonStuff = () => {

    let execute = "<html>";
    execute += "<body>";
    execute += '<form method="POST" action="/pokemon">';
    execute += "Poke Poke mon name:";
    execute += '<p>ID:<input type="text" name="id"><p>';
    execute += '<p>Num:<input type="text" name="num"><p>';
    execute += '<p>Name:<input type="text" name="name"><p>';
    execute += '<p>Img:<input type="text" name="img"><p>';
    execute += '<p>Height:<input type="text" name="height"><p>';
    execute += '<p>Weight:<input type="text" name="weight"><p>';
    execute += '<p>Input:<input type="submit" value="Submit"><p>';
    execute += "</form>";
    execute += "</body>";
    execute += "</html>";
      return execute;
};

  app.get('/pokemon/new', (request, response) => {
    response.send(pokemonStuff());
});

//pre-load with s/edits
app.get('/:id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );
    let pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){
      let currentPokemon = obj.pokemon[i];
      if( currentPokemon.id === inputId){
        pokemon = currentPokemon;
      }
    }
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
   response.send("yay");
 });


app.post('/pokemon', function (request, response)  {

    jsonfile.readFile(FILE, (err,obj) => {
    if (err) {
      console.log("ERROR", err)
    }
  })

// console.log(request.body)
// let file = 'pokedex.json'
const obj = request.body;


 let nuevoPokemon = {};
    nuevoPokemon.id = request.body.id;
    nuevoPokemon.num = request.body.num;
    nuevoPokemon.name = request.body.name;
    nuevoPokemon.img = request.body.img;
    nuevoPokemon.height = request.body.height;
    nuevoPokemon.weight = request.body.weight;

      obj.pokemon.push(nuevoPokemon);

//saving request.body
  jsonfile.writeFile(FILE, obj, function(err) {
    if (err) {
      console.log("ERROR", err)
    }
  })
  response.send(request.body);
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

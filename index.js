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

/**
 * ===================================
 * Routes
 * ===================================
 */
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');


// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/pokemon', (request, response => {
  let pokemon= `<html><body><form method="POST" action="/pokemon">Pokemon<input type="text" name="id" placeholder="id"><input type="text" name="num" placeholder="num"><input type="text" name="name" placeholder="name"><input type="text" name="img" placeholder="img"><input type="text" name="height" placeholder="height"><input type="text" name="weight" placeholder="weight"><input type="submit" value="Submit"></form></body></html>`
  response.send(form);
}));

let addPokemon = (request, response) => {
  let newPoke = request.body;

  jsonfile.readFile(FILE, (err,obj) => {
      newPokemon.num = obj.lastKey + 1;
      obj.lastKey++;
      obj.pokemon.push(newPokemon);
      jsonfile.writeFile(FILE, obj, (err) => {
          if (err) {
              console.log('error');
          } else {
              response.send(`You have created new Pokemon ${newPoke.name}!`);
          }
      })
  });
}

app.get('/pokemon/:id', (request, response => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );

    var pokemon;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.pokemon.length; i++ ){

      let currentPokemon = obj.pokemon[i];

      if( currentPokemon.id === inputId ){
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


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

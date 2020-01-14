const express = require('express');
const jsonfile = require('jsonfile');

// Init express app
const app = express();
const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

/**
 * ===================================
 * Routes
 * ===================================
 */

// <br> Number:<input type="text" name="num"/><br>Image URL:<input type="text" type="text" name="img"/><br> Height:<input type="text" name="height"/><br> Weight:<input name="weight"/><br>

app.get('/pokemon/new', (request, response) => {
  // id, num, name, img, height, weight
  let myForm = '<html><body><form action="/pokemon" method="POST">Pokemon Name: <input type="text" name="name"/><br> ID:<input type="text" name="id"/><input type="submit"/></form></body></html>';
  response.send(myForm);
});

app.post('/pokemon', (request,response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    // save the request body

    let contents = request.body;
    console.log(contents);
    response.send(contents);
  });
})

app.get('/pokemon/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {

    // check to make sure the file was properly read
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return;
    }
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

app.get('/', (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

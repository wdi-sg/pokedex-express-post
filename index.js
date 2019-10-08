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

const writeData = {};

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

app.get('/pokemon/id/:id', (request, response) => {

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
 let data = {pokemon: pokemon.name }
 // console.log("asksi ", pokemon)
  response.render('output', pokemon);
    }
  });
});


// if empty build the basic screen for input
app.get('/', (request, response) => {
  // giving home.jsx file an object/context with `name` as a property
  const data = {warning: ""};
  response.render('home', data);
});


app.get('/pokemon/new', (request, response) => {
  // giving home.jsx file an object/context with `name` as a property
  const data = {warning: ""};
  response.render('home', data);
});

// if empty build the basic screen for input
app.post('/pokemon', (request, response) => {
    console.log('full body ', request.body);
  // giving home.jsx file an object/context with `name` as a property
  let data = {warning: ""};
  if (request.body.name === "" || request.body.img === "" || request.body.height === "" || request.body.weight === "") {
    data = {warning: "Empty name or other data..."}; 
      } else  { 
    data = {warning: "Pokemon Added!"}; 
      }
  response.render('home', data);
  

  // add the new data to the read object
  // whats the current last ID?
  jsonfile.readFile(FILE, (err, obj) => {
  let newId = obj.pokemon.length;
  newId++;
  // console.log('current Obj:', obj)
  console.log('new id no:', newId)
  request.body.id = newId;
  request.body.num= newId;
  // console.log('body ', request.body);
  // console.log('obj pokemon: ', obj["pokemon"]);
  obj["pokemon"].push(request.body);
    // console.log('new object:', obj)
  // run the file write
  // 
  // save the request body
  jsonfile.writeFile(FILE, obj, (err) => {
    console.error(err)
  });

  });

});

// app.get('/', (request, response) => {
//   response.send("yay");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
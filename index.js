const express = require('express');
const jsonfile = require('jsonfile');
// var beautify = require("json-beautify");

const methodOverride = require('method-override')


const FILE = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.use(methodOverride('_method'));

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

app.get('/pokemon/:id/edit', (request, response) => {
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
    console.log(err);
    // let inputId = parseInt( request.params.id );
    let inputId = parseInt( request.params.id )
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
 // let data = {pokemon: pokemon.name }
 // console.log("asksi ", pokemon)
  response.render('edit', pokemon);
    }
  });
});



app.get('/pokemon/id', (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    console.log(err);
    // let inputId = parseInt( request.params.id );
    console.log(request.query)
    let inputId = parseInt( request.query.id )
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
  response.render('new', data);
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
  response.render('new', data);


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
  // beautify(obj, null, 2, 80)
  jsonfile.writeFile(FILE,obj, (err) => {
    console.error(err)
  });

  });

});

// overwrite existgin poke
// if empty build the basic screen for input
app.put('/pokemon/:id', (request, response) => {
    console.log('edit pokemon started');
    var pokeIndex = request.params.id -1;
  // giving home.jsx file an object/context with `name` as a property
  let data = {warning: ""};
  if (request.body.name === "" || request.body.img === "" || request.body.height === "" || request.body.weight === "") {
    data = {warning: "Empty name or other data..."};
      } else  {
    data = {warning: "Pokemon Edited!"};
      }
  response.render('edit', data);



  // add the new data to the read object
  // whats the current last ID?
  jsonfile.readFile(FILE, (err, obj) => {

  // console.log('obj pokemon: ', obj["pokemon"]);
  // write over existing array item..

  // obj["pokemon"].push(request.body);
    // console.log('new object:', obj)
  // run the file write
    obj["pokemon"][pokeIndex].name = request.body.name;
    obj["pokemon"][pokeIndex].img = request.body.img;
    obj["pokemon"][pokeIndex].height = request.body.height;
    obj["pokemon"][pokeIndex].weight = request.body.weight;
 // obj["pokemon"][pokeIndex] = request.body;

    // console.error('new object', obj["pokemon"][pokeIndex])
  // save the request body
  // beautify(obj, null, 2, 80)

  jsonfile.writeFile(FILE,obj, (err) => {
    console.error(err)
  });

  });

console.log('completed writing')
});

// Still a work in progress. cant get the delete page to render
// app.get("/pokemon/:id/delete", (request, response) => {
//             console.log(request.params.id)

//     jsonfile.readFile(FILE, (err, obj) => {
//         const Id = parseInt(request.params.id);
//         let pokemon;

//         for (let i = 0; i < obj.pokemon.length; i++) {
//             const currentPokemon = obj.pokemon[i];
//             if (currentPokemon.id === Id) {
//                 pokemon = currentPokemon;
//             }
//         }
//             if (pokemon === undefined) {

//                 res.status(404);
//                 res.send("not found");
//             }
//             else {
//                 res.render("delete", pokemon);
//             }
//         });
// });

// app.get('/', (request, response) => {
//   response.send("yay");
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
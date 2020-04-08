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

// Tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Sets layout to your react engine
const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);

// This tells express where to look for your view files
app.set("views", "views");

// This line sets react to be the default engine
app.set("view engine", "jsx");


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/new", (request, response) => {
  response.render("home");
})

app.post("/pokemon", (request, response) => {
  jsonfile.readFile(FILE, (error, data) => {
    const inputs = request.body;
    console.log(inputs.id);
    const pokedex = data.pokemon;

    pokedex[pokedex.length-1] = {
      "id": parseInt(inputs.id),
      "num": inputs.num,
      "name": inputs.name,
      "img": inputs.img,
      "height": inputs.height,
      "weight": inputs.weight
    };

    jsonfile.writeFile(FILE, data, (error) => {
      console.log(error);

      response.send("lol thanks");
    })

  })
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

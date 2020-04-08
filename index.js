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

// GET requests
app.get("/pokemon", (request, response) => {
  jsonfile.readFile(FILE, (error, data) => {
    response.render("index", data);
  })
})

app.get("/pokemon/new", (request, response) => {
  response.render("form");
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

      obj["pokemonId"] = parseInt( request.params.id );

      response.render("single", obj);
    }
  });
});

app.get("/pokemon/:id/edit", (request, response) => {
  response.send("<h1>Page under construction</h1>");
})

app.get('/', (request, response) => {
  response.send("yay");
});

// POST request
app.post("/pokemon", (request, response) => {
  jsonfile.readFile(FILE, (error, data) => {
    const inputs = request.body;
    const pokedex = data.pokemon;

    pokedex[inputs.id-1] = {
      "id": parseInt(inputs.id),
      "num": inputs.num,
      "name": inputs.name,
      "img": inputs.img,
      "height": inputs.height,
      "weight": inputs.weight
    };

    jsonfile.writeFile(FILE, data, (error) => {
    })

    response.redirect(302, "/pokemon/" + inputs.id);

  })
})

/**
* ===================================
* Listen to requests on port 3000
* ===================================
*/
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
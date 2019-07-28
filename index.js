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

app.use(express.static(__dirname + "/public/"));

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);

// Set up method-override for PUT and DELETE forms
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// this line below, sets a layout look to your express project
const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);

// this tells express where to look for the view files
app.set("views", __dirname + "/views");

// this line sets react to be the default view engine
app.set("view engine", "jsx");


/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/new", (request, response) => {
  console.log("new pokemon form");
  jsonfile.readFile(FILE, (err, obj) => {
    if(err){
        console.log(err);
    };

    response.render('./newForm.jsx');

  });
});

app.get("/pokemon/:name", (request, response) => {
  // intercepting route/endpoint

  var outputWeight;
  jsonfile.readFile(FILE, (err, obj) => {
    console.log("DDDD");
    for (var i = 0; i < obj["pokemon"].length; i++) {
      if (obj["pokemon"][i]["name"] == request.params.name) {
        outputWeight = obj["pokemon"][i]["weight"];
        console.log(outputWeight);
      }
      //console.log(obj["pokemon"][i]["name"]);
    }

    response.send(outputWeight);
    console.log("YAY");
  });
  console.log("ff");

  console.log(request.params.name);
});



app.get('/:id', (request, response) => {

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

app.get('/', (request, response) => {
  response.send("yay");
});

app.post('/animals', (request, response) => {
    jsonfile.readFile(FILE, (err, obj) => {
        obj.pokemon.push(request.body);
        jsonfile.writeFile(FILE, obj, (err) => {
            if(err){
                console.log(err)
            }
            else{
                response.send("YaY! pokemon added!");
            }
        });
    });
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

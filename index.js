const express = require("express");
const jsonfile = require("jsonfile");
const bodyParser = require("body-parser");

const FILE = "pokedex.json";

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/new", (req, res) => {
  res.render("new");
});

app.post("/pokemon/new", (req, res) => {
  Object.keys(req.body).forEach((value) => {
    if (req.body[value] === "") {
      res.send(`${value} cannot be empty.`);
    }
  });
  jsonfile.readFile(FILE, (err, obj) => {
    console.log(req.body);
    req.body.id = parseInt(req.body.id);
    obj.pokemon.push(req.body);
    console.log(obj.pokemon[obj.pokemon.length-1]);
    jsonfile.writeFile(FILE, obj, (err) => {
      res.redirect(`/pokemon/${req.body.id}`);
    });
  });
});

app.get("/pokemon/:id", (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    const inputId = parseInt( request.params.id );
    console.log(inputId);

    let pokemon;

    // find pokemon by id from the pokedex json file
    for ( let i=0; i<obj.pokemon.length; i++ ) {
      const currentPokemon = obj.pokemon[i];

      if ( currentPokemon.id === inputId ) {
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


app.get("/", (request, response) => {
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log("~~~ Tuning in to the waves of port http://localhost:3000 ~~~"));

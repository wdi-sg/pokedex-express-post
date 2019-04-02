const express = require("express");
const app = express();
const jsonfile = require("jsonfile");
const path = require("path");

const FILE = "pokedex.json";
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/new", (request, response) => {
  response.sendFile(path.join(__dirname + "/pokemon-new.html"));
});

app.post("/pokemon", (request, response) => {
  console.log(request.body);
  response.sendFile(path.join(__dirname + "/pokemon-new.html"));
  jsonfile.readFile(FILE, (err, pokedexJSON) => {
    if (err) {
      console.log(err);
    }
    let pokemonList = pokedexJSON["pokemon"];
    //add the data from the post request
    pokemonList.push(request.body);

    jsonfile.writeFile(FILE, pokedexJSON, err => {
      if (err) {
        console.log(err);
      }
    });
  });
  // response.send(request.body);
});

app.get("/:id", (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt(request.params.id);

    var pokemon;

    // find pokemon by id from the pokedex json file
    for (let i = 0; i < obj.pokemon.length; i++) {
      let currentPokemon = obj.pokemon[i];

      if (currentPokemon.id === inputId) {
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
  jsonfile.readFile(FILE, (err, pokedexJSON) => {
    if (err) {
      console.log(err);
    }
    let pokemonList = pokedexJSON["pokemon"];
    console.log(request.query);
    if (request.query === undefined) {
    } else if (!(request.query["sort"] === undefined)) {
      let sortQuery = request.query["sort"];
      if (sortQuery === "name") {
        //send response of pokemonList array which is sorted
        //create array of pokemon names
        let pokemonNameList = [];
        for (let i = 0; i < pokemonList.length; i++) {
          const pokemon = pokemonList[i];
          pokemonNameList.push(pokemon.name);
        }
        //we now have a pokemon Name list
        pokemonNameList.sort();
        response.send(pokemonNameList);
      }
    } else {
      response.sendFile(path.join(__dirname + "/homepage.html"));
    }
    //add the data from the post request
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

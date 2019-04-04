const express = require("express");
const app = express();
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");

const jsonfile = require("jsonfile");
const path = require("path");

const FILE = "pokedex.json";
const pokedexCompleteFile = "pokedex-complete.json";
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.static(path.join(__dirname, "public")));

let pokedex = [];

jsonfile.readFile(FILE, (err, obj) => {
  if (err) {
    console.log(err);
  }
  pokedex = obj;
});

app.get("/pokemon", (request, response) => {
  console.log(request.query);
  let query = request.query;
  if (!(query.sort === undefined)) {
    
  } 
  response.render("homepage",pokedex);
});

app.get("/pokemon/new", (request, response) => {
  response.sendFile(path.join(__dirname + "/pokemon-new.html"));
});

app.get("/pokemon/:id/edit", (request, response) => {
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      console.log(err);
    }
    let pokemonArray = obj["pokemon"];
    let chosenOne;
    console.log(pokemonArray[0].id);
    console.log(typeof pokemonArray[0].id);
    console.log(request.params.id);
    console.log(typeof request.params.id);

    for (let i = 0; i < pokemonArray.length; i++) {
      const pokemonObject = pokemonArray[i];
      if (pokemonObject.id === parseInt(request.params.id)) {
        chosenOne = pokemonObject;
      }
    }
    response.render("edit-pokemon", chosenOne);
  });
});

app.put("/pokemon/:id", (request, response) => {
  console.log(
    request.params.id + " has been read with a package of " + request.body.name
  );
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      console.log(err);
    }
    let pokemonList = obj["pokemon"];
    let chosenOne;
    for (let i = 0; i < pokemonList.length; i++) {
      let pokemon = pokemonList[i];
      if (pokemon.id === parseInt(request.params.id)) {
        for (const key in request.body) {
          if (request.body[key] === undefined) {
          } else {
            const property = request.body[key];

            pokemon[key] = property;
            console.log(pokemon[key]);
            console.log(property);
          }
        }
      }
    }
    jsonfile.writeFile(FILE, obj, err => {
      if (err) {
        console.log(err);
      }
    });
  });
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

app.get("/pokemon/name/:pokemonName", (request, response) => {
  jsonfile.readFile(pokedexCompleteFile, (err, pokedexJSON) => {
    if (err) {
      console.log(err);
    }
    let pokemonList = pokedexJSON["pokemon"];
    let pokemonNameList = [];
    for (let i = 0; i < pokemonList.length; i++) {
      const pokemon = pokemonList[i];
      // pokemonNameList.push(pokemon.name);
      if (pokemon.name.toLowerCase() === request.params.pokemonName.toLowerCase()) {
        // response.send(pokemon.name.toLowerCase() + " found!");
      }
    }
    response.sendFile(path.join(__dirname + "/pokemon-display.html"));
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
        let pokemonListSorted = [];
        for (let i = 0; i < pokemonNameList.length; i++) {
          const pokemonName = pokemonNameList[i];
          pokemonList.forEach(pokemonObject => {
            if (pokemonName === pokemonObject.name) {
              pokemonListSorted.push(pokemonObject);
            }
          });
        }
        response.send(pokemonListSorted);
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
app.listen(3000, () => console.log("~~~ Tuning in to the waves of port 3000 ~~~"));

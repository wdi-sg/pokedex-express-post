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
    if (query.sort === "name") {
      // //sort pokemon by name
      // let pokemonNameArray = [];
      // for (let i = 0; i < pokedex["pokemon"].length; i++) {
      //   const pokemonName = pokedex["pokemon"][i].name;
      //   // pokemonNameList.push(pokemon.name);
      //   pokemonNameArray.push(pokemonName);
      // }
      // //sort the array by pokemon names
      // pokemonNameArray.sort();
      // //now use the array to sort the objects
      // let sortedPokedexObjectArray = { pokemon: [] };
      // for (let j = 0; j < pokemonNameArray.length; j++) {
      //   const pokemonNameFromNameArray = pokemonNameArray[j];
      //   for (let i = 0; i < pokedex["pokemon"].length; i++) {
      //     const pokemonFromPokedex = pokedex["pokemon"][i];
      //     if (pokemonFromPokedex.name === pokemonNameFromNameArray) {
      //       sortedPokedexObjectArray["pokemon"].push(pokemonFromPokedex);
      //     }
      //   }
      // }
      console.log(pokedex["pokemon"]);
      function sortPokemonByName(pokemonA, pokemonB) {
        var nameA = pokemonA.name.toLowerCase();
        var nameB = pokemonB.name.toLowerCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      }
      pokedex["pokemon"].sort(sortPokemonByName);
      console.log(pokedex["pokemon"]);

      response.render("homepage", pokedex);
    }
  } else {
    response.render("homepage", pokedex);
  }
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

app.get("/pokemon/:id", (request, response) => {
  let pokemonId = parseInt(request.params.id);
  let chosenOne;
  for (let i = 0; i < pokedex["pokemon"].length; i++) {
    const pokemon = pokedex["pokemon"][i];
    if (pokemonId === pokemon.id) {
      chosenOne = pokemon;
    }
  }
  response.render("pokemon-id", chosenOne);
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

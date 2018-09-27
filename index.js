const express = require("express");
const jsonfile = require("jsonfile");
const pokedex = require("./pokedex");
const methodOverride = require("method-override");
const FILE = "pokedex.json";

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
app.use(
  express.urlencoded({
    extended: true
  })
);
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

app.get("/pokemon/new", (req, res) => {
  let htmlform = "<html>";
  htmlform += "<body>";
  htmlform += '<form method="POST" action="/pokemon">';
  htmlform += "Pokemon Info: <br/>";
  htmlform +=
    'ID : <input type="text" name="id" placeholder="Input Pokemon ID"><br/>';
  htmlform +=
    'Pokemon Number : <input type="text" name="num" placeholder="Pokemon Number"><br/>';
  htmlform +=
    'Pokemon Name : <input type="text" name="name" placeholder="Pokemon Name"><br/>';
  htmlform +=
    'Pokemon Image Link :<input type="text" name="img" placeholder="Insert a link to the image"><br/>';
  htmlform +=
    'Pokemon Height : <input type="text" name="height" placeholder="Pokemon Height"><br/>';
  htmlform +=
    'Pokemon Weight : <input type="text" name="weight" placeholder="Pokemon Weight"><br/>';
  htmlform += '<input type="submit" value="Submit">';
  htmlform += "</form>";
  htmlform += "</body>";
  htmlform += "</html>";
  res.send(htmlform);
});

app.put("/pokemon/:id", (req, res) => {
  let requestedPokemonID = req.params.id;
  //Get the JSON file with the information
  jsonfile.readFile(FILE, (err, obj) => {
    for (i in obj.pokemon) {
      if (obj.pokemon[i].id === parseInt(requestedPokemonID)) {
        var foundPokemonIndex = i;
        var foundPokemon = obj.pokemon[i];
      }
    }
    if (foundPokemon) {
      console.log("FOUND:", foundPokemon);
      obj.pokemon[foundPokemonIndex] = req.body;
      obj.pokemon[foundPokemonIndex].id = parseInt(
        obj.pokemon[foundPokemonIndex].id
      );

      jsonfile.writeFile(FILE, obj, err => {
        if (err) console.log("ERROR:", err);
        res.render("success", obj.pokemon[foundPokemonIndex]);
      });
    } else {
      response.send("not a pokemon");
    }
  });
});

app.get("/pokemon/:id/edit", (req, res) => {
  let requestedPokemonID = req.params.id;
  for (i in pokedex.pokemon) {
    if (pokedex.pokemon[i].id === parseInt(requestedPokemonID)) {
      var foundPokemon = pokedex.pokemon[i];
    }
  }
  if (foundPokemon) {
    res.render("edit", { pokemon: foundPokemon });
  } else {
    res.render("edit");
  }
});

app.post("/pokemon", function(req, res) {
  // Get the Pokemon Object from the Pokedex file
  jsonfile.readFile(FILE, (err, obj) => {
    let pokedex = obj;
    let pokemonObject = obj.pokemon;
    // Initialize a New Pokemon Object with the Parameters input by the user
    let newPokemon = {
      id: parseInt(req.body.id),
      num: req.body.num,
      name: req.body.name,
      img: req.body.img,
      height: req.body.height,
      weight: req.body.weight,
      candy: "",
      candy_count: "",
      egg: "",
      avg_spawns: "",
      spawn_time: ""
    };
    // Push the New Pokemon Object into the Main Pokedex
    pokemonObject.push(newPokemon);
    // save the req body
    jsonfile.writeFile(FILE, pokedex, err => {
      console.error(err);
    });
    res.send(req.body);
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

app.get("/", (req, res) => {
  if (!req.query.sortby) {
    res.render("home");
  } else if (req.query.sortby === "name") {
    res.render("name");
  } else if (req.query.sortby === "height") {
    res.render("height");
  } else if (req.query.sortby === "weight") {
    res.render("weight");
  }
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

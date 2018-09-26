const express = require("express");
const jsonfile = require("jsonfile");
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
  let html = "<html>";
  html += "<body><p>Welcome to the online Pokedex</p>";
  html += '<button method="post" action="?sortby=name">Sort By Name</button>';
  html += "</body></html>";
  res.send(html);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

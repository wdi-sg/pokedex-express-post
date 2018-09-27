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
  jsonfile.readFile(FILE, (err, obj) => {
    let pokedex = obj;
    let pokemonObject = obj.pokemon;
    // Creating The HTML Page to return
    let html = "<html>";
    html += "<body><p>Welcome to the online Pokedex</p>";
    html +=
      '<form method="GET" action=""><label for="sort-by-name">Sort By</label><select name="sortby"><option value="name">Name</option><option value="height">Height</option><option value="weight">Weight</option></select><input type="submit"/></form>';
    html += "</body></html>";
    if (!req.query.sortby) {
      res.send(html);
      // Filter Requests based on the selection
    } else if (req.query.sortby === "name") {
      pokemonObject.sort(sortingFunctionByName);
      pokemonlist = "";
      pokemonlist += "<html><body><ul>";
      for (i in pokemonObject) {
        pokemonlist += "<li>";
        pokemonlist += pokemonObject[i].name;
        pokemonlist += "</li>";
      }
      pokemonlist += "</ul></body></html>";
      res.send(pokemonlist);
    } else if (req.query.sortby === "height") {
      pokemonObject.sort(sortingFunctionByHeight);
      pokemonlist = "";
      pokemonlist += "<html><body><ul>";
      for (i in pokemonObject) {
        pokemonlist += "<li>";
        pokemonlist += pokemonObject[i].name;
        pokemonlist += " ";
        pokemonlist += pokemonObject[i].height;
        pokemonlist += "</li>";
      }
      pokemonlist += "</ul></body></html>";
      res.send(pokemonlist);
    } else if (req.query.sortby === "weight") {
      pokemonObject.sort(sortingFunctionByWeight);
      pokemonlist = "";
      pokemonlist += "<html><body><ul>";
      for (i in pokemonObject) {
        pokemonlist += "<li>";
        pokemonlist += pokemonObject[i].name;
        pokemonlist += " ";
        pokemonlist += pokemonObject[i].weight;
        pokemonlist += "</li>";
      }
      pokemonlist += "</ul></body></html>";
      res.send(pokemonlist);
    }
  });
});
// Create Sort Function By Name
const sortingFunctionByName = (a, b, x) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return +1;
  }
  return 0;
};
// Create Sort Function By Height
const sortingFunctionByHeight = (a, b) => {
  if (a.height < b.height) {
    return -1;
  }
  if (a.height > b.height) {
    return +1;
  }
  return 0;
};
// Create Sort Function By Weight
const sortingFunctionByWeight = (a, b) => {
    let weightSplit = {
        a: a.weight.split(" "),
        b: b.weight.split(" ")
    }
  if (weightSplit.a[0] < weightSplit.b[0]) {
    return -1;
  }
  if (weightSplit.a[0] > weightSplit.b[0]) {
    return +1;
  }
  return 0;
};

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

const express = require("express");
const jsonfile = require("jsonfile");
const app = express();
const file = "pokedex.json";

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

//  Expose a new endpoint that intercepts GET requests to /pokemon/new, which responds with a HTML page with a form that has these fields: id, num, name, img, height, and weight

app.get("/pokemon/new", (req, res) => {
  res.send(`<html>
    <body>
    <form action="/pokemon" method="POST">
  <input type="text" placeholder="Pokemon ID" name="id">
  <input type="text" placeholder="Pokemon Number" name="num">
  <input type="text" placeholder="Pokemon Name" name="name">
  <input type="text" placeholder="Pokemon Image Link" name="img">
  <input type="text" placeholder="Pokemon Height" name="height">
  <input type="text" placeholder="Pokemon weight" name="weight">
  <input type="submit" value="submit">
    </form>
    </body>
   </html>`);
});

app.post("/pokemon", (req, res) => {
  const pokemonData = {
    id: req.body.id,
    num: parseInt(req.body.num),
    name: req.body.name,
    img: req.body.img,
    height: req.body.height,
    weight: req.body.weight
  };

  jsonfile.readFile(file, (err, obj) => {
    obj.pokemon.push(pokemonData);

    jsonfile.writeFile(file, obj, err => {});
  });

  res.send("Added to database!");
});

app.get("/pokemon/:id", (request, response) => {
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
  response.send("yay");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

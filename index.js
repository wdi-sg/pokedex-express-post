const express = require("express");
const jsonfile = require("jsonfile");
const app = express();
const file = "pokedex.json";
const reactEngine = require("express-react-views").createEngine();
const methodOverride = require("method-override");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
app.use(methodOverride("_method"));

app.engine("jsx", reactEngine);
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.get("/", (req, res) => {
  res.render("home");
});

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

app.get("/sortby", (request, response) => {
  const sortBy = request.query.sortby;
  let data;
  let names = [];
  let pokemonObj = [];
  let sortedByWeight = [];
  jsonfile.readFile(file, (err, obj) => {
    if (sortBy === "name") {
      for (let i = 0; i < obj.pokemon.length; i++) {
        names.push(obj.pokemon[i].name);
      }
      names.sort(function(a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      data = {
        sortType: "Alphabet",
        pokemon: names
      };
    } else if (sortBy === "weight") {
      for (let i = 0; i < obj.pokemon.length; i++) {
        pokemonObj.push({
          name: obj.pokemon[i].name,
          weight: obj.pokemon[i].weight
        });
      }
      pokemonObj.sort(function(a, b) {
        return parseFloat(a.weight) - parseFloat(b.weight);
      });

      for (let i = 0; i < pokemonObj.length; i++) {
        sortedByWeight.push(pokemonObj[i].name + " " + pokemonObj[i].weight);
      }
      data = {
        sortType: "Weight",
        pokemon: sortedByWeight
      };
    }
    response.render("sort", data);
  });
});

app.get("/pokemon/new", (req, res) => {
  res.render("new");
});

app.post("/pokemon", (req, res) => {
  let duplicate = false;
  const pokemonData = {
    id: req.body.id,
    num: req.body.num,
    name: req.body.name,
    img: req.body.img,
    height: req.body.height,
    weight: req.body.weight
  };

  const errors = [];

  for (key in pokemonData) {
    if (pokemonData[key] === "") {
      errors.push(key);
    }
  }

  const newErr = errors.map(function(err) {
    return "pokemon " + err;
  });

  console.log(newErr);

  const errObj = {
    errorMessage: `There was an error!
    You forgot to input: ${newErr.join(", ")}`
  };

  if (errors.length > 0 && !duplicate) {
    res.render("new", errObj);
  } else {
    pokemonData.num = parseInt(req.body.num);
    jsonfile.readFile(file, (err, obj) => {
      for (let i = 0; i < obj.pokemon.length; i++) {
        if (
          obj.pokemon[i].name.toLowerCase() ===
            pokemonData.name.toLowerCase() ||
          obj.pokemon[i].id === pokemonData.id ||
          obj.pokemon[i].num === pokemonData.num
        ) {
          duplicate = true;
          errObj.errorMessage = `There was an error!
          ${pokemonData.name} or ${pokemonData.id} or ${pokemonData.num} already exists!`;
        }
      }
      if (duplicate) {
        res.render("new", errObj);
      } else {
        pokemonData.height += " m";
        pokemonData.weight += ".0 kg";
        pokemonData.id = obj.pokemon[obj.pokemon.length - 1].id + 1;
        pokemonData.num = (
          parseInt(obj.pokemon[obj.pokemon.length - 1].num) + 1
        ).toString();
        obj.pokemon.push(pokemonData);

        jsonfile.writeFile(file, obj, err => {});
        res.render("home", pokemonData);
        console.log(obj.pokemon.length - 1);
      }
    });
  }
});

app.get("/pokemon/:id", (request, response) => {
  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt(request.params.id);
    let pokemon;
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
      response.render("404");
    } else {
      response.render("pokemonSearch", pokemon);
    }
  });
});

app.get("/pokemon/:id/edit", (request, response) => {
  let index = request.params.id;
  jsonfile.readFile(file, (err, obj) => {
    const pokemon = obj.pokemon[index];
    const data = {
      id: pokemon.id,
      name: pokemon.name,
      img: pokemon.img,
      height: pokemon.height,
      weight: pokemon.weight
    };
    response.render("edit", data);
  });
});

app.put("/pokemon/:id", (request, response) => {
  const index = request.params.id;
  const changedName = request.body.name;
  const changedImage = request.body.img;
  const changedHeight = request.body.height;
  const changedWeight = request.body.weight;

  jsonfile.readFile(file, (err, obj) => {
    const pokemon = obj.pokemon[index];
    pokemon.name = changedName;
    pokemon.img = changedImage;
    pokemon.height = changedHeight;
    pokemon.weight = changedWeight;

    const data = {
      pokemon: pokemon
    };

    jsonfile.writeFile(file, obj, err => {
      console.log(err);
      response.render("home");
    });
  });
});

app.get("/pokemon/:id/delete", (request, response) => {
  const index = request.params.id;
  jsonfile.readFile(file, (err, obj) => {
    const name = obj.pokemon[index].name;
    const data = {
      name: name
    };
    response.render("delete", data);
  });
});

app.get("/", (request, response) => {
  response.render("home");
});

app.get("*", (request, response) => {
  response.render("404");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

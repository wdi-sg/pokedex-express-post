const express = require("express");
const handlebars = require("express-handlebars");
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

// Setting up bodyParser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// Set handlebars to be the default view engine
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Look into public folder for the stylesheet
app.use(express.static(__dirname + '/public'));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/new", (req, res) => {
  res.render("form");
});


app.get("/:id", (req, res) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = req.params.id;

    // find pokemon by id from the pokedex json file
    // (note: find() is a built-in method of JavaScript arrays)
    let pokemon = obj.pokemon.find(currentPokemon => {
      return currentPokemon.id === parseInt(inputId, 10);
    });

    if (pokemon === undefined) {
      // send 404 back
      res.render("404");
    } else {
      let context = {
        pokemon: pokemon
      };

      // send html file back with pokemon's data
      res.render("pokemon", context);
    }
  });
});


app.post("/", (req, res) => {
  console.log(req.body);
  jsonfile.readFile(FILE, (err, obj) => {
    let pokeArr = obj.pokemon;
    let id = obj.pokemon.length + 1;
    let num = obj.pokemon.length + 1;
    req.body.id = id;
    req.body.num = num;
    pokeArr.push(req.body);
    let pokemon = {
      pokemon: pokeArr
    };
    let pokeNameArr = pokeArr.map(poke => {
      return poke.name;
    });
    jsonfile.writeFile(FILE, pokemon, err => {
      res.render("home", { pokeNameArr: pokeNameArr });
    });
  });
});


app.get("/", (req, res) => {
  console.log(req.query);
  if (req.query.sortby === 'name') {
    jsonfile.readFile(FILE, (err, obj) => {
      let pokeNameArr = obj.pokemon.map(poke => {
        return {
          id: poke.id.toString().padStart(3, '0'),
          num: poke.num,
          name: poke.name,
          img: poke.img,
        };
      });
      let sortedArr = pokeNameArr.sort((a, b) => {
        return a.name.toUpperCase().localeCompare(b.name.toUpperCase());
      });
      console.log(pokeNameArr);
      console.log(sortedArr);

      // let fakeArr = ["test1", "test2", "test3"];
      res.render("home", { pokeNameArr: sortedArr });
    });
  }
  else {
    jsonfile.readFile(FILE, (err, obj) => {
      let pokeNameArr = obj.pokemon.map(poke => {
        return {
          id: poke.id.toString().padStart(3, '0'),
          num: poke.num,
          name: poke.name,
          img: poke.img
        };
      });
      res.render("home", { pokeNameArr: pokeNameArr });
    });
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

const express = require("express");
const jsonfile = require("jsonfile");
var methodOverride = require('method-override');

const FILE = "pokedex.json";
const app = express();

app.use(methodOverride('_method'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);
const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);

app.set("views", __dirname + "/views");

app.set("view engine", "jsx");



// home page
app.get("/", (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    res.render("home");
  });
});

// sort function
app.get("/pokemon", (req, res) => {
  let sortParam = "name";
  sortParam = req.query.sortby;

  jsonfile.readFile(FILE, (err, obj) => {
    const pokemonSorted = obj.pokemon.sort((a, b) =>
    // abbreviation of if-else statement
      a[sortParam] > b[sortParam] ? 1 : a[sortParam] < b[sortParam] ? -1 : 0
    );

    const data = {
      sortParam: sortParam,
      pokemonSorted: pokemonSorted
    };
    res.render("sorted", data);
  });
});

// new pokemon form
app.get("/pokemon/new", (request, response) => {
  response.render("form");
});

//- add a form at the path: `/pokemon/:id/edit`
app.get("/pokemon/:id/edit", (req, res) => {
  // console.log(req.params.id);
  const pokemonId = req.params.id;

  jsonfile.readFile(FILE, (err, obj) => {
    const selectedPokemon = obj.pokemon.find(
      pokemon => pokemon.id == pokemonId
    );
    console.log(selectedPokemon);
    const data = {
      pokemon : selectedPokemon,
    };
    res.render("edit", data);
  });
});

app.put("/pokemon/:id", (req,res) => {
  // console.log("req.body!!!",req.body);
  const editedPokemon = req.body;
  const editedPokemonId = parseInt(editedPokemon.id);
  jsonfile.readFile(FILE, (err,obj) => {
// changed var below to "pokeIndex" as the index doesn't change!!
    const pokeIndex = obj.pokemon.find( (pokemon, index) => {
      if (pokemon.id === editedPokemonId) {
        return index
      };
    });
    obj.pokemon.splice(pokeIndex, 1, editedPokemon);

    jsonfile.writeFile(FILE, obj, err => {
      console.log(err);
      res.send("Pokedex updated!!!!");
    })
  })

});

// adding of new pokemon to existing obj.pokemon array
app.post("/pokemon", (request, response) => {
  const newPokemon = request.body;
  jsonfile.readFile(FILE, (err, obj) => {
    obj.pokemon.push(newPokemon);
    jsonfile.writeFile(FILE, obj, err => {
      console.log(err);
      response.render("success");
    });
  });
  // response.render("success");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3010, () =>
  console.log("~~~ Tuning in to the waves of port 3010 ~~~")
);
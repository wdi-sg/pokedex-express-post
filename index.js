const express = require("express");
const jsonfile = require("jsonfile");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const FILE = "pokedex.json";

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/new", (req, res) => {
  res.render("new");
});

app.post("/pokemon/new", (req, res) => {
  let nameUsed = false;
  Object.keys(req.body).forEach((value) => {
    if (req.body[value] === "") {
      res.send(`${value} cannot be empty.`);
    }
  });
  jsonfile.readFile(FILE, (err, obj) => {
    obj.pokemon.forEach((value) => {
      if (value.name.toLowerCase() === req.body.name.toLowerCase()) {
        nameUsed = true;
        return res.send(`${value.name} has already been caught.`);
      }
    });
    if (!nameUsed) {
      req.body.id = obj.pokemon.length + 1;
      req.body.num = obj.pokemon.length + 1;
      obj.pokemon.push(req.body);
      jsonfile.writeFile(FILE, obj, (err) => {
        res.redirect(`/pokemon/${req.body.id}`);
      });
    }
  });
});

app.get("/pokemon/:id/edit", (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    const inputId = parseInt(req.params.id);
    let pokemon;
    for (let i = 0; i < obj.pokemon.length; i++) {
      const currentPokemon = obj.pokemon[i];
      if (currentPokemon.id === inputId) {
        pokemon = currentPokemon;
      }
    }
    if (pokemon === undefined) {
      // send 404 back
      res.status(404);
      res.send("not found");
    } else {
      res.render("edit", pokemon);
    }
  });
});

app.get("/pokemon/:id/delete", (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    const inputId = parseInt(req.params.id);
    let pokemon;
    for (let i = 0; i < obj.pokemon.length; i++) {
      const currentPokemon = obj.pokemon[i];
      if (currentPokemon.id === inputId) {
        pokemon = currentPokemon;
      }
    }
    if (pokemon === undefined) {
      // send 404 back
      res.status(404);
      res.send("not found");
    } else {
      res.render("delete", pokemon);
    }
  });
});

app.delete("/pokemon/:id", (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    obj.pokemon.forEach((value, i) => {
      if (value.id === Number(req.params.id)) {
        obj.pokemon.splice(i, 1);
      }
    });
    jsonfile.writeFile(FILE, obj, (err) => {
      res.redirect(`/pokemon/${req.params.id}`);
    });
  });
});

app.put("/pokemon/:id", (req, res) => {
  jsonfile.readFile(FILE, (err, obj) => {
    obj.pokemon.forEach((value) => {
      if (value.id === Number(req.params.id)) {
        value.name = req.body.name;
        value.img = req.body.img;
        value.height = req.body.height;
        value.weight = req.body.weight;
      }
    });
    jsonfile.writeFile(FILE, obj, (err) => {
      res.redirect(`/pokemon/${req.params.id}`);
    });
  });
});

app.get("/pokemon/:id", (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    
    // check to make sure the file was properly read
    if( err ){
      
      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return; 
    }
    // obj is the object from the pokedex json file
    // extract input data from request
    const inputId = parseInt(request.params.id);

    let pokemon;

    // find pokemon by id from the pokedex json file
    for (let i = 0; i < obj.pokemon.length; i++) {
      const currentPokemon = obj.pokemon[i];

      if (currentPokemon.id === inputId) {
        pokemon = currentPokemon;
      }
    }

    if (pokemon === undefined) {
      // send 404 back
      response.status(404);
      response.send("not found");
    } else {
      response.render("profile", pokemon);
    }
  });
});

app.get("/?", (req, res) => {
  let pokeArr;
  jsonfile.readFile(FILE, (err, obj) => {
    pokeArr = obj.pokemon.slice(0);
    if (req.query["sortby"] === "name") {
      pokeArr.sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      });
    } else if (req.query["sortby"] === "id") {
      pokeArr.sort((a, b) => a.id - b.id);
    } else if (req.query["sortby"] === "weight") {
      pokeArr.sort(
        (a, b) =>
          Number(a.weight.substring(0, a.weight.length - 3)) -
          Number(b.weight.substring(0, a.weight.length - 3)),
      );
    } else if (req.query["sortby"] === "height") {
      pokeArr.sort(
        (a, b) =>
          Number(a.height.substring(0, a.height.length - 3)) -
          Number(b.height.substring(0, a.height.length - 3)),
      );
    }
    res.render("home", {pokeArr});
  });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port http://localhost:3000 ~~~"),
);

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

const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);

// this tells express where to look for the view files
app.set("views", __dirname + "/views");

// this line sets react to be the default view engine
app.set("view engine", "jsx");

// tell your app to use the module
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

/**
 * ===================================
 * Routes
 * ===================================
 */

// Home Route
app.get("/home", (request, response) => {


  jsonfile.readFile(FILE, (err, obj) => {
    const pokedex = obj.pokemon;

    const data = {
      pokedex: pokedex,
      query: request.query.sortby
    }
    response.render("home", data);
  })
})

  // sort by name route

  app.get("/?", (request, response) => {
    console.log(request.query.sortby);
    let result = [];
    jsonfile.readFile(FILE, (err, obj) => {
      if (err) {
        console.log("err", err);
      }

      const pokedex = obj.pokemon;
      for (let i = 0; i < pokedex.length; i++) {
        result.push(pokedex[i]["name"]);
      }

      response.render("home",);
    });
  });


// Render initial form
app.get("/pokemonnew", (request, response) => {
  response.render("newPokemon");
});

/*************************************************************/
/*************************************************************/
/*************************************************************/
/*************************************************************/

// Takes the input from the form and sends it to json and render?
app.post("/pokemon", (request, response) => {
  const values = Object.values(request.body);
  for (let i = 0; i < values.length; i++) {
    if (values[i] === "") {
      response.render("error");
    }
  }

  console.log("hi");
  console.log(request.body);
  const data = {
    id: request.body.id,
    num: request.body.num,
    name: request.body.name,
    img: request.body.img,
    height: request.body.height,
    weight: request.body.weight
  };

  response.render("Pokemon", data);

  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      console.log("err", err);
    }

    const pokedex = obj.pokemon;
    pokedex.push(request.body);

    jsonfile.writeFile(FILE, obj, err => {
      console.error(err);
    });
  });
});

app.get("/pokemon/:id/edit", (request, response) => {
  const id = request.params.id - 1;
  jsonfile.readFile(FILE, (err, obj) => {
    const pokedex = obj.pokemon;

    const data = {
      id: pokedex[id].id,
      num: pokedex[id].num,
      name: pokedex[id].name,
      img: pokedex[id].img,
      height: pokedex[id].height,
      weight: pokedex[id].weight,
      candy: pokedex[id].candy,
      egg: pokedex[id].egg,
      spawns: pokedex[id].avg_spawns,
      spawntime: pokedex[id].spawn_time
    };
    response.render("edit", data);
  });
});

app.put("/pokemon/:id", (request, response) => {
  var id = request.params.id - 1;
  var editedPoke = request.body;

  jsonfile.readFile(FILE, (err, obj) => {
    obj.pokemon[id] = editedPoke;

    jsonfile.writeFile(FILE, obj, err => {
      console.log(err);
      response.render("home");
    });
  });
});

app.get("/pokemon/:id/delete", (request, response) => {
  let id = request.params.id - 1;
  jsonfile.readFile(FILE, (err, obj) => {
    const pokedex = obj.pokemon;

    const data = {
      id: pokedex[id].id,
      num: pokedex[id].num,
      name: pokedex[id].name,
      img: pokedex[id].img,
      height: pokedex[id].height,
      weight: pokedex[id].weight,
      candy: pokedex[id].candy,
      egg: pokedex[id].egg,
      spawns: pokedex[id].avg_spawns,
      spawntime: pokedex[id].spawn_time
    };
    response.render("delete", data);
  });
});

app.delete("/pokemon/:id", (request, response) => {
  var id = request.params.id - 1;

  jsonfile.readFile(FILE, (err, obj) => {
    obj.pokemon.splice(id, 1);

    jsonfile.writeFile(FILE, obj, err => {
      console.log(err);
      response.render("home");
    });
  });
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

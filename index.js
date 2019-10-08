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

/**
 * ===================================
 * Routes
 * ===================================
 */

// Home Route
app.get("/home", (request, response) => {
  response.render("home");
});

// sort by name route

app.get("/?", (request, response) => {
console.log(request.query.sortby)
  let result = [];
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      console.log("err", err);
    }
    
    const pokedex = obj.pokemon;
    for(let i = 0; i<pokedex.length; i++){
      result.push(pokedex[i]["name"])
    }
   
    response.send(result.sort())
    
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

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);

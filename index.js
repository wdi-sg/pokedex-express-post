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

// tell your app to use the module
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// this line below, sets a layout look to your express project
const reactEngine = require("express-react-views").createEngine();
app.engine("jsx", reactEngine);

// this tells express where to look for the view files
app.set("views", __dirname + "/views");

// this line sets react to be the default view engine
app.set("view engine", "jsx");

// Set up method-override for PUT and DELETE forms
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

/**
 * ===================================
 * Routes
 * ===================================
 */

// GET method to display all pokemons by default - Seems like have problem displaying all
app.get("/pokemon/", (request, response) => {
  // Read the file and display
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    response.send(obj.pokemon);
  });
});

// GET method to get all the form elements for display
app.get("/pokemon/new", (request, response) => {
  // Render a form
  response.render("add");
});

// POST method to save the form data
app.post("/pokemon", (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    console.log(obj.pokemon);
    const newPokemon = request.body;
    obj["pokemon"].push(newPokemon);

    jsonfile.writeFile(FILE, obj, err => {
      console.log("Error: " + err);
      response.send(request.body);
    });
  });
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

// Method to get pokemon information to update
app.get("/pokemon/:id/edit", (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt(request.params.id);
    let toEditPokemon = obj.pokemon[inputId - 1];

    // Get the ID input and put it in the object that we want to use
    const data = {
      id: toEditPokemon.id,
      num: toEditPokemon.num,
      name: toEditPokemon.name,
      image: toEditPokemon.img,
      height: toEditPokemon.height,
      weight: toEditPokemon.weight
    };

    // Show the edit form with the current data
    response.render("edit", data);
  });
});

// Method to update pokemon information
app.put("/pokemon/:id", (request, response) => {
  // Read the file and look for the pokemon with the requested ID
  jsonfile.readFile(FILE, (err, obj) => {
    // Get ID from parameter
    let inputId = parseInt(request.params.id - 1);

    // Get the data that will be updated into the information
    let updatedData = request.body;

    // Assign the updated data into the object
    obj.pokemon[inputId] = updatedData;

    // Write it into the file
    jsonfile.writeFile(FILE, obj, err => {
      console.log("Error: " + err);
      response.send(updatedData);
    });
  });
});

// Method to get pokemon information to delete
app.get("/pokemon/:id/delete", (request, response) => {
  // get json from specified file
  jsonfile.readFile(FILE, (err, obj) => {
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt(request.params.id);
    let toDeletePokemon = obj.pokemon[inputId - 1];
    const data = {
      id: toDeletePokemon.id
      // num: toEditPokemon.num,
      // name: toEditPokemon.name,
      // image: toEditPokemon.img,
      // height: toEditPokemon.height,
      // weight: toEditPokemon.weight
    };
console.log(obj.pokemon.length)
    // Show the edit form with the current data
    response.render("delete", data);
  });
  
});

// Method to delete pokemon information
app.delete('/pokemon/:id', (request, response) => {
  let inputId = parseInt( request.params.id - 1 );
    // Read the file and look for the pokemon with the requested ID
    jsonfile.readFile(FILE, (err, obj) => {

            // Get ID from parameter
  
    obj.pokemon.splice(inputId, 1)

   

        // Assign the updated data into the object
        

        // Write it into the file
        jsonfile.writeFile(FILE, obj, (err) => {
            console.log("Error: " + err);
            
           
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

// HELLO SIEW LING!!

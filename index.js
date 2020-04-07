const express = require("express");
const jsonfile = require("jsonfile");
const FILE = "pokedex.json";
const app = express();

// this line below, sets a layout look to your express project
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
    extended: true,
  })
);

//----------------------------
//----------------------------

app.post("/pokemon", (req, res) => {
  console.log(req.body);
  jsonfile.readFile(FILE, (err, obj) => {
    if (err) {
      console.log("error with json read file:", err);
      res.status(503).send("error reading file");
      return;
    }
    obj["pokemon"].push(req.body);
    jsonfile.writeFile(FILE, obj, (err) => {
      if (err) {
        console.log("error with json write file:", err);
        res.status(503).send("error writing file");
        return;
      }
      res.send(obj);
    });
  });
});

app.get("/pokemon/new", (req, res) => {
  res.render("pokemon-form");
});

// app.get('/pokemon/:id', (request, response) => {

//   // get json from specified file
//   jsonfile.readFile(FILE, (err, obj) => {

//     // check to make sure the file was properly read
//     if( err ){

//       console.log("error with json read file:",err);
//       response.status(503).send("error reading file");
//       return;
//     }
//     // obj is the object from the pokedex json file
//     // extract input data from request
//     let inputId = parseInt( request.params.id );

//     var pokemon;

//     // find pokemon by id from the pokedex json file
//     for( let i=0; i<obj.pokemon.length; i++ ){

//       let currentPokemon = obj.pokemon[i];

//       if( currentPokemon.id === inputId ){
//         pokemon = currentPokemon;
//       }
//     }

//     if (pokemon === undefined) {

//       // send 404 back
//       response.status(404);
//       response.send("not found");
//     } else {

//       response.send(pokemon);
//     }
//   });
// });

app.get("/", (request, response) => {
  response.send("Site up and running!");
});

app.listen(3000, () => console.log("~~~ Tuning in to the waves of port 3000 ~~~"));
